<template>
     <div>
        <slot class="color"></slot>
    <span class="hand"> 👋</span>
  </div>
</template>





<style>
  .hand {
    display: inline-block;
    animation: wave 2s infinite;
    transform-origin: 80% 40%;
  }

  @keyframes wave {
    0%, 100% {
      transform: rotate(0);
    }
    20%, 60% {
      transform: rotate(-25deg);
    }
    40%, 80% {
      transform: rotate(20deg);
    }
  }
</style>
