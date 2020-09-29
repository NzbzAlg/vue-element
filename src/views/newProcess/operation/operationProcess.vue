<template>
  <div class="operationProcess">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="newCategory">新建品类</el-button>
    </div>
    <!-- 新建品类弹窗 -->
    <el-dialog title="提示" :visible.sync="newCategoryPop" width="30%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              Append
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              Delete
            </el-button>
          </span>
        </span>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newCategoryPop = false">取 消</el-button>
        <el-button type="primary" @click="newCategoryPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    return {
      newCategoryPop: false, //新建品类弹窗
      subsePop: false, //子集页面弹窗
      ziji: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          menu:1,
          children: [
            {
              id: 4,
              label: "二级 1-1",
              menu:2,
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  menu:3,
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  menu:3,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      val: "aoli",
    };
  },
  methods: {
    //   新建品类弹窗
    newCategory() {
      this.newCategoryPop = true;
    },
    append(data) {
        console.log(data)
      const newChild = { id: id++, label: 'text', children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom-tree-node">
    //       <span>{node.label}</span>
    //       <span>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.append(data)}
    //         >
    //           Append
    //         </el-button>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.remove(node, data)}
    //         >
    //           Delete
    //         </el-button>
    //       </span>
    //     </span>
    //   );
    // },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
</style>