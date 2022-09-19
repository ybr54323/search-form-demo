<script>
import { Button } from "ant-design-vue";
import "ant-design-vue/lib/button/style/index.css";
import { ITEM_WIDTH, GAP } from "./const";

export default {
  name: "SearchForm",
  components: {
    [Button.name]: Button,
  },
  provide() {
    return {
      submit: this.submit,
    };
  },
  data() {
    return {
      showTrigger: false,
      //
      visible: false,

      shouldBreak: false,

      cols: 0,
      key: 0,
    };
  },
  methods: {
    submit() {
      const formMap = this.$slots.default.reduce((map, item) => {
        return Object.assign(map, {
          [item.componentOptions.propsData.dataIndex]:
            item.componentInstance.value,
        });
      }, {});
      this.$emit("submit", formMap);
    },
    winResizeFunc() {
      this.$nextTick(() => {
        this.key++;
      });
    },
    trigger() {
      this.visible = !this.visible;
      this.key++;
    },
  },
  mounted() {
    window.addEventListener("resize", this.winResizeFunc);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.winResizeFunc);
  },
  render(h) {
    /**
     *
     *
     */
    /**
     * 统计所有的width，计算出第一行能放入多少个控件
     *
     *
     */
    const that = this;
    this.$nextTick(() => {
      const submitBoxWidth = that.visible
        ? 0
        : this.$refs["h-right"].offsetWidth;
      console.warn(this.$refs["h-right"].offsetWidth);
      if (!this.$slots.default || !this.$slots.default.length) return;
      let width;
      console.warn(
        (width =
          this.$parent.$el.offsetWidth - 32) /** 2 * parent的左右内边距 */
      );
      const headerWidth = width - submitBoxWidth;
      let tem = 0;
      let i = 0;
      let cols = 0;

      while (
        tem +
          /** width */
          (this.$slots.default[i]?.componentOptions?.propsData?.width ||
            ITEM_WIDTH) +
          /** padding */
          GAP <=
          headerWidth &&
        i < this.$slots.default.length
      ) {
        cols++;
        tem +=
          this.$slots.default[i++]?.componentOptions?.propsData?.width ||
          ITEM_WIDTH + GAP;
      }
      /**
       * 当一行能全放下的时候，不要出现trigger
       *
       *
       * showTrigger
       *
       *
       */
      this.cols = cols;
      if (this.cols >= this.$slots.default.length) {
        this.showTrigger = false;
        this.shouldBreak = false;
      } else {
        this.showTrigger = true;
        this.shouldBreak = true;
      }

      console.log(this.cols, tem);
    });

    const opBox = h(
      "div",
      {
        class: that.visible ? "h-right active" : "h-right",
        ref: "h-right",
      },
      [
        h("a-button", {}, ["重置"]),
        h(
          "a-button",
          {
            on: {
              click: that.submit,
            },
            type: "primary",
          },
          ["搜索"]
        ),
        that.showTrigger
          ? h(
              "a",
              {
                on: { click: that.trigger },
                href: "javascript:;",
                class: "link",
              },
              [that.visible ? "隐藏" : "展开"]
            )
          : undefined,
      ]
    );

    return h("div", { ref: "con", class: "con", key: that.key }, [
      h("div", { class: "h" }, [
        h("div", { class: "h-left" }, [
          /**
           * 计算出这里需要多少个控件
           */
          this.$slots.default && this.$slots.default.slice(0, that.cols),
        ]),
        that.visible && that.shouldBreak ? undefined : opBox,
      ]),

      h(
        "div",
        { class: that.visible && that.shouldBreak ? "main active" : "main" },
        [
          that.cols > 0
            ? that.$slots.default
                .slice(that.cols)
                .concat(that.visible && that.shouldBreak ? opBox : undefined)
            : undefined,
        ]
      ),
    ]);
  },
};
</script>

<style lang="less" scoped>
@import url(./const.less);
.h {
  display: flex;
  width: 100%;
  padding: 0 24px;
}
.h-left {
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 auto;
  gap: @GAP;
  padding: 12px 0;
}
.h-right {
  padding: 12px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  & > * {
    margin-right: 12px;
  }
  &.active {
    flex: 1 0 auto;
  }
  .link {
    // margin-right: 12px;
  }
}
.main {
  max-height: 0px;
  overflow: hidden;
  transition: all 0.2s;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  &.active {
    padding: 12px 24px;
    max-height: 9999px;
  }
}
</style>
