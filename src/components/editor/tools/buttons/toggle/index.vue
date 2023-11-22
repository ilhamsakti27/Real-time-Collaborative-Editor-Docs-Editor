<!-- eslint-disable -->
<template>
  <div class="toggle-list p-10">
      <div>
        <button class="toggle-btn rounded hover:bg-slate-200" style="height: 24px;">
          <span class="material-symbols-outlined">
            arrow_right
          </span>
        </button>
        <span class="toggle-heading border border-solid border-slate-500">Toggle 1</span>
      </div>      
      <div class="toggle-desc hidden ml-7 border border-solid border-slate-500">
        <p>This is the content you can toggle. 1</p>
      </div>
    </div>

    <div class="toggle-list p-10">
      <div>
        <button class="toggle-btn rounded hover:bg-slate-200" style="height: 24px;">
          <span class="material-symbols-outlined">
            arrow_right
          </span>
        </button>
        <span class="toggle-heading border border-solid border-slate-500">Toggle 2</span>
      </div>      
      <div class="toggle-desc hidden ml-7 border border-solid border-slate-500">
        <p>This is the content you can toggle. 2</p>
      </div>
    </div>

    <div class="toggle-list p-10">
      <div>
        <button class="toggle-btn rounded hover:bg-slate-200" style="height: 24px;">
          <span class="material-symbols-outlined">
            arrow_right
          </span>
        </button>
        <span class="toggle-heading border border-solid border-slate-500">Toggle 2</span>
      </div>      
      <div class="toggle-desc hidden ml-7 border border-solid border-slate-500">
        <p>This is the content you can toggle. 2</p>
      </div>
    </div>
</template>

<script setup>
document.addEventListener('DOMContentLoaded', () => {
  const toggleLists = document.querySelectorAll('.toggle-list')

  toggleLists.forEach((toggleList, index) => {
    const toggleBtn = toggleList.querySelector('.toggle-btn')
    const toggleIcon = toggleList.querySelector('span')
    const toggleDesc = toggleList.querySelector('.toggle-desc')

    toggleBtn.addEventListener('click', () => {
      toggleDesc.classList.toggle('hidden')

      // Toggle the icon based on the state of the description visibility
      if (toggleDesc.classList.contains('hidden')) {
        toggleIcon.innerText = 'arrow_right' // Change to the right arrow when hidden
      } else {
        toggleIcon.innerText = 'arrow_drop_down' // Change to the down arrow when shown
      }
    })
  })
})
</script>
