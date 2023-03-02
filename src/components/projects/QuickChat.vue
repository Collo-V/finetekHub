<template>
  <div class="min-w-300px max-w-90% lg:max-w-50% relative h-full shrink-0" id="quick-chat-cont">
    <MainChat :selected-id="channelId" min-view="true"/>
  </div>
</template>

<script>
import MainChat from "@/components/MainChat";
export default {
  name: "QuickChat",
  components: {MainChat},
  props:['channelId'],
  mounted() {
    const BORDER_SIZE = 2;
    const panel = document.getElementById("quick-chat-cont");

    let m_pos;
    function resize(e){
      console.log('hee')
      const dx = m_pos - e.x;
      m_pos = e.x;
      panel.style.width = (parseInt(getComputedStyle(panel, '').width) + dx) + "px";
    }

    panel.addEventListener("mousedown", function(e){
      if (e.offsetX < BORDER_SIZE) {
        m_pos = e.x;
        document.addEventListener("mousemove", resize, false);
      }
    }, false);

    document.addEventListener("mouseup", function(){
      document.removeEventListener("mousemove", resize, false);
    }, false);
  }
}
</script>

<style scoped>
#quick-chat-cont {
  /*position: absolute;*/
  /*width: 96px;*/
  /*padding-left: 4px;*/
  /*height: 100%;*/
  /*right: 0;*/
  /*background-color: #f0f0ff;*/
}

#quick-chat-cont::after {
  content: '';
  background-color: #ccc;
  position: absolute;
  top:0;
  left: 0;
  width: 2px;
  height: 100%;
  cursor: ew-resize;
}

</style>
