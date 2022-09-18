<template>
  <div>
    <form-cmp>
      <form-item-cmp
        v-for="form in forms"
        :label="form.label"
        :type="form.type"
        :key="form.label"
        :width="form.width"
        :dataIndex="form.dataIndex"
      ></form-item-cmp>
    </form-cmp>
  </div>
</template>

<script>
import FormCmp from "./form-cmp.vue";
import FormItemCmp from "./form-item-cmp.vue";
export default {
  name: "App",

  components: {
    FormCmp,
    FormItemCmp,
  },

  data() {
    return {
      visible: false,
      forms: [],
    };
  },
  mounted() {
    this.forms = new Array(10)
      .fill(0)

      .map((_, i) => {
        return {
          dataIndex: i.toString(),
          type: "input",
          label: i.toString(),
          width: 200,
        };
      });
  },
};
</script>

<style lang="less"></style>
