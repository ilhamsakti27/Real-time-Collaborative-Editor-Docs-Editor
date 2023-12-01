<template>
  <div>
    <div
      class="toggle-list"
    >
      <div>
        <button
          class="toggle-btn"
          style="height: 24px;"
        >
          <span class="material-symbols-outlined">
            arrow_right
          </span>
        </button>
        <span class="toggle-heading">Toggle 1</span>
      </div>
      <div class="toggle-desc">
        <p>This is the content you can toggle. 1</p>
      </div>
    </div>

    <!-- <div class="toggle-list">
      <div>
        <button
          class="toggle-btn"
          style="height: 24px;"
        >
          <span class="material-symbols-outlined">
            arrow_right
          </span>
        </button>
        <span class="toggle-heading">Toggle 2</span>
      </div>
      <div class="toggle-desc hidden">
        <p>This is the content you can toggle. 2</p>
      </div>
    </div>

    <div class="toggle-list">
      <div>
        <button
          class="toggle-btn"
          style="height: 24px;"
        >
          <span class="material-symbols-outlined">
            arrow_right
          </span>
        </button>
        <span class="toggle-heading">Toggle 2</span>
      </div>
      <div class="toggle-desc hidden">
        <p>This is the content you can toggle. 2</p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
document.addEventListener('DOMContentLoaded', () => {
  const toggleLists = document.querySelectorAll('.toggle-list')

  toggleLists.forEach(toggleList => {
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

<style scoped>
.toggle-list {
  padding: 2.5rem;
}
.toggle-btn {
  border-radius: 0.25rem; /* 4px */
  height: 24px;
}
.toggle-btn:hover {
  background-color: rgb(226 232 240);
}
.toggle-heading {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(100 116 139);
}
.toggle-desc {
  display: none;
  margin-left: 1.75rem; /* 28px */
  border-width: 1px;
  border-style: solid;
  border-color: rgb(100 116 139);
}
</style>
