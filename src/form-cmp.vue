<script>
export default {
  name: "App",

  data() {
    return {
      visible: false,
      cols: 0,
      time: 0,
    };
  },
  render(h) {
    /**
     * 统计所有的width，计算出第一行能放入多少个控件
     *
     *
     */
    const submitBoxWidth = 100;
    const that = this;
    this.$nextTick(() => {
      if (!this.$slots.default) return;
      this.time++;
      let width;
      console.warn((width = this.$parent.$el.offsetWidth));

      const headerWidth = width - submitBoxWidth;

      let tem = 0;
      let i = 0;
      let cols = 0;
      while (
        tem + this.$slots.default[i].componentOptions.propsData.width <=
        headerWidth
      ) {
        cols++;
        tem += this.$slots.default[i++].componentOptions.propsData.width;
      }
      this.cols = cols;
      // console.log(this.cols, this.time);
    });

    return h("div", { ref: "con", class: "con" }, [
      h("div", { class: "h" }, [
        h("div", { class: "h-left" }, [
          /**
           * 计算出这里需要多少个控件
           */
          this.$slots.default && this.$slots.default.slice(0, that.cols),
        ]),
        h(
          "div",
          {
            class: "h-right",
            ref: "h-right",
            on: {
              click(e) {
                if (e.target !== that.$refs["h-right"]) return;
                that.visible = !that.visible;
              },
            },
          },
          [
            h(
              "a-button",
              {
                on: {
                  click() {
                    const formMap = that.$slots.default.reduce((map, item) => {
                      return Object.assign(map, {
                        [item.componentOptions.propsData.dataIndex]:
                          item.componentInstance.value,
                      });
                    }, {});

                    console.log(formMap);
                  },
                },
              },
              ["submit"]
            ),
          ]
        ),
      ]),
      h("div", { class: that.visible ? "main active" : "main" }, [
        that.cols > 0 ? that.$slots.default.slice(that.cols) : undefined,
      ]),
    ]);
  },
};
</script>

<style lang="less" scoped>
.h {
  display: grid;
  grid-template-columns: 1fr 100px;
  max-width: 100%;
}
.h-left {
  background-color: red;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 0;
}
.h-right {
  background-color: blue;
  display: flex;
  align-items: center;
}
.main {
  background: green;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.2s;
  display: flex;
  flex-wrap: wrap;

  gap: 12px;
  &.active {
    max-height: 9999px;
  }
}
</style>
