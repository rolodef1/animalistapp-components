import Vue from "vue";
import AnimalistappText from "@/components/atoms/AnimalistappText.vue";
import AnimalistappCheckable from "@/components/atoms/AnimalistappCheckable.vue";
import AnimalistappSelect from "@/components/atoms/AnimalistappSelect.vue";
import AnimalistappSwitch from "@/components/atoms/AnimalistappSwitch.vue";
import AnimalistappLoader from "@/components/atoms/AnimalistappLoader.vue";

const Components = {
  AnimalistappText,
  AnimalistappCheckable,
  AnimalistappSelect,
  AnimalistappSwitch,
  AnimalistappLoader
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
