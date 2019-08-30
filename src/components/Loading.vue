<template>
  <div class="modal-smooth-locked" :class="showTag">
    <div class="modal-content" style="display: block; width: auto; background: #00000000; box-shadow: 0px 0px 0px #00000000;">
      <i class="material-icons" id="loading">sync</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    showTag: String,
  },
};
</script>

<style>
#loading{
  -webkit-animation: going-round 3s ease infinite; /* Safari 4+ */
  -moz-animation:    going-round 3s ease infinite; /* Fx 5+ */
  -o-animation:      going-round 3s ease infinite; /* Opera 12+ */
  animation:         going-round 3s ease infinite; /* IE 10+, Fx 29+ */
}

@-webkit-keyframes going-round {
  0%   {
    opacity: 0;
  }
  90%{
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(-360deg);
  }
}
@-moz-keyframes going-round {
  0%   {
    opacity: 0;
  }
  90%{
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(-360deg);
  }
}
@-o-keyframes going-round {
  0%   {
    opacity: 0;
  }
  90%{
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(-360deg);
  }
}
@keyframes going-round {
  0%   {
    opacity: 0;
  }
  90%{
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(-360deg);
  }
}

</style>