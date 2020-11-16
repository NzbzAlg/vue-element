<template>
  <div class="storePermissions">
    <ul>
      <!-- 给li标签绑定click时间,点击该li标签将索引传给函数重新赋值给num-->
      <li
        v-for="(item, index) in tabs"
        :class="{ active: index == num }"
        @click="tab(index)"
        :key="index"
      >
        {{ item }}{{ index }}
      </li>
    </ul>
    <div class="tabCon">
      <!--  循环遍历tabContents数组中的元素,v-show绑定事件,当循环的索引等于num中的值,显示该itemCon值  -->
      <div
        v-for="(itemCon, index) in tabContents"
        v-show="index == num"
        :key="index"
      >
        {{ itemCon }}{{ index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["标题一", "标题二", "标题三"],
      tabContents: ["内容一", "内容二", "内容三"],
      num: "",
    };
  },
  methods: {
    tab: function (index) {
      this.num = index;
      console.log(this.num)
      this.$http.get(`goods/get_goods_detail?id=1`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul li {
  list-style: none;
  display: inline-block;
  border: 1px solid dodgerblue;
  height: 30px;
  line-height: 30px;
  width: 120px;
  text-align: center;
}
</style>