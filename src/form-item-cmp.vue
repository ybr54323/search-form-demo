<template>
  <label class="con" :for="label" :style="`width:${width}px`">
    <div class="form-item">
      <span class="label--txt">
        {{ label }}
      </span>

      <component
        v-model="value"
        :id="label"
        @change="onChange"
        @select="onChange"
        :placeholder="placeholder"
        :is="genAntCmpName(type)"
      >
        <template v-if="selections.length"> </template>
      </component>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    // key name
    dataIndex: {
      type: String,
      default: "dataIndex",
      require: true,
    },
    width: {
      type: Number,
      default: 100,
    },
    type: {
      type: String,
      default: "input",
      require: true,
    },
    label: {
      type: String,
      default: "label",
      require: true,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    selections: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      value: void 0,
    };
  },

  methods: {
    genAntCmpName(type) {
      switch (type) {
        case "input":
          return "a-input";
        case "select":
          return "a-select";
        case "textarea":
          return "a-textarea";
        case "selectTree":
          return "a-tree-select";
      }
    },
    onChange(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="less" scoped>
.con {
  display: flex;
  align-items: center;
  .form-item {
    display: grid;
    grid-template-columns: auto 1fr;

    gap: 12px;
    .label--txt {
      display: flex;
      align-items: center;
    }
  }
}
</style>
