import { Slice, Fragment } from '@tiptap/pm/model'
import { ReplaceStep } from '@tiptap/pm/transform'
import { Selection } from '@tiptap/pm/state'

export const GetTopLevelBlockCoords = view => {
  const $pos = view.state.selection.$from
  const from = $pos.before(1)
  const coords = view.coordsAtPos(from)

  return new DOMRect(coords.left, coords.top, 0, 0)
}

export const GetTableRowCoords = view => {
  const pos = view.state.selection.$from
  let { depth } = pos
  while (depth > 1) {
    if (pos.node(depth).type.name === 'tableRow') break
    depth -= 1
  }
  const from = pos.before(depth)
  const rect = view.nodeDOM(from).getBoundingClientRect()

  return new DOMRect(rect.x, rect.y, rect.width, rect.height)
}

export const GetTableColumnCoords = view => {
  const pos = view.state.selection.$from
  let { depth } = pos
  let cellDepth = 0
  let tableDepth = 0
  while (depth > 0) {
    if (
      pos.node(depth).type.name === 'tableCell'
      || pos.node(depth).type.name === 'tableHeader'
    ) {
      cellDepth = depth
    }
    if (pos.node(depth).type.name === 'table') {
      tableDepth = depth
      break
    }
    depth -= 1
  }
  if (!(tableDepth && cellDepth)) {
    return false
  }
  const cellRect = view.nodeDOM(pos.before(cellDepth)).getBoundingClientRect()
  const tableRect = view.nodeDOM(pos.before(tableDepth)).getBoundingClientRect()

  return new DOMRect(cellRect.x, tableRect.y, cellRect.width, tableRect.height)
}

export const GetTopLevelNode = view => {
  const selectionStart = view.state.selection.$from
  if (selectionStart.node(1) == null && view.lastSelectedViewDesc) {
    return view.lastSelectedViewDesc.node
  }

  return selectionStart.node(1)
}

export const GetNodeTree = view => {
  const nodes = []
  const selectionStart = view.state.selection.$from

  if (selectionStart.node(1) == null && view.lastSelectedViewDesc) {
    return [view.lastSelectedViewDesc.node.type.name]
  }

  let { depth } = selectionStart
  while (depth >= 0) {
    nodes.push(selectionStart.node(depth).type.name)
    depth -= 1
  }

  return nodes.reverse()
}

export const GetTopLevelBlock = editor => {
  const selectionStart = editor.view.state.selection.$from
  let parentNode = editor.view.domAtPos(selectionStart.posAtIndex(0, 1)).node
  if (parentNode === editor.view.dom) {
    return editor.view.lastSelectedViewDesc?.nodeDOM
  }

  // Sometimes we get a node that isn't the top-level parent; e.g. codeBlock gives us the <code> not the wrapping <pre>
  while (
    parentNode !== editor.view.dom
    && parentNode.parentNode !== editor.view.dom
  ) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}

const mapChildren = (node, callback) => {
  const array = []
  for (let i = 0; i < node.childCount; i += 1) {
    array.push(
      callback(node.child(i), i, node instanceof Fragment ? node : node.content),
    )
  }

  return array
}

export const DragNode = ({
  view,
  state,
  draggedNodePosition,
  targetNodePosition,
}) => {
  const targetResolved = state.doc.resolve(targetNodePosition)
  const draggedNode = state.doc.resolve(draggedNodePosition).node(1)
  if (draggedNode) {
    console.log(targetResolved)
    const targetNode = targetResolved.node(1)
    const { tr } = view.state
    const parent = targetResolved.node(0)
    const parentPos = targetResolved.start(0)

    const arr = mapChildren(parent, node => node)
    const fromIndex = arr.indexOf(draggedNode)
    const targetIndex = arr.indexOf(targetNode)
    const replaceStart = parentPos
    const replaceEnd = targetResolved.end(0)
    const arrItem = arr[fromIndex]
    arr.splice(fromIndex, 1)
    arr.splice(targetIndex, 0, arrItem)
    const slice = new Slice(Fragment.fromArray(arr), 0, 0)
    tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false))

    tr.setSelection(Selection.near(tr.doc.resolve(targetNodePosition)))

    view.dispatch(tr)
  }
}

export const MoveNode = ({ view, dir, currentResolved }) => {
  if (!currentResolved) {
    return false
  }
  const { tr } = view.state
  const isDown = dir === 'DOWN'
  const currentNode = currentResolved.node(1) || currentResolved.nodeAfter
  const parentDepth = 0
  const parent = currentResolved.node(parentDepth)
  const parentPos = currentResolved.start(parentDepth)

  const arr = mapChildren(parent, node => node)
  const index = arr.indexOf(currentNode)

  if (index === 0) {
    return false
  }

  const swapWithIndex = isDown ? index + 1 : index - 1
  // If swap is out of bound
  if (swapWithIndex >= arr.length || swapWithIndex < 0) {
    return false
  }

  const swapWithNodeSize = arr[swapWithIndex].nodeSize;
  [arr[index], arr[swapWithIndex]] = [arr[swapWithIndex], arr[index]]

  const replaceStart = parentPos
  const replaceEnd = currentResolved.end(parentDepth)

  const slice = new Slice(Fragment.fromArray(arr), 0, 0)
  tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false))

  tr.setSelection(
    Selection.near(
      tr.doc.resolve(
        isDown
          ? currentResolved.pos + swapWithNodeSize
          : currentResolved.pos - swapWithNodeSize,
      ),
    ),
  )

  return view.dispatch(tr)
}
