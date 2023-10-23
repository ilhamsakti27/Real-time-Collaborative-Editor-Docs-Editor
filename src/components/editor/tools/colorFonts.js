/* eslint-disable */
const colorFonts = [
    {
        name: 'Default',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#000" fill-opacity="0.8" /></svg>',
        setColor: '#000'
    },
    {
        name: 'Gray',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#808080" fill-opacity="0.8" /></svg>',
        setColor: '#808080'
    },
    {
        name: 'Purple',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#958DF1" fill-opacity="0.8" /></svg>',
        setColor: '#958DF1'
    },
    {
        name: 'Red',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#FF0000" fill-opacity="0.8" /></svg>',
        setColor: '#FF0000'
    },
    {
        name: 'Orange',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#FFA500" fill-opacity="0.8" /></svg>',
        setColor: '#FFA500'
    },
    {
        name: 'Yellow',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#FFFF00" fill-opacity="0.8" /></svg>',
        setColor: '#FFFF00'
    },
    {
        name: 'Blue',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#70CFF8" fill-opacity="0.8" /></svg>',
        setColor: '#70CFF8'
    },
    {
        name: 'Green',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#008000" fill-opacity="0.85" /></svg>',
        setColor: '#008000'
    },
    {
        name: 'Brown',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#A52A2A" fill-opacity="0.8" /></svg>',
        setColor: '#A52A2A'
    },
    {
        name: 'Pink',
        mainIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6698 16.0728 36.293 15.3672 36.6519C14.6616 37.0108 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03402C20.1214 5.15299 20.677 4.38461 21.425 3.83952C22.1729 3.29442 23.0745 3.00073 24 3.00073C24.9255 3.00073 25.8271 3.29442 26.575 3.83952C27.323 4.38461 27.8786 5.15299 28.162 6.03402L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.7571 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0117C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2959 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2044 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2044 41 42C41 42.7957 40.6839 43.5587 40.1213 44.1213C39.5587 44.684 38.7956 45 38 45H10C9.20435 45 8.44129 44.684 7.87868 44.1213C7.31607 43.5587 7 42.7957 7 42Z" fill="#FFC0CB" fill-opacity="0.8" /></svg>',
        setColor: '#FFC0CB'
    },
]

export default colorFonts