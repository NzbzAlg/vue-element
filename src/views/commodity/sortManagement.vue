<template>
  <div class="sortManagement">
    <!-- 头部 -->
    <div class="title">
      <el-input
        v-model="brandNmae"
        placeholder="搜索分类名称"
        clearable
        size="medium"
        style="width: 150px"
        @change="changeSearch"
      ></el-input>
      <!-- <el-button
        type="primary"
        size="medium"
        style="margin-left: 10px"
        @click="search"
        >搜索</el-button
      > -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button type="primary" size="small" @click="addClassify"
          >添加分类</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="category_name"
          label="分类名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="editClassify(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加分类名称 -->
    <el-dialog title="添加分类" :visible.sync="addClassifyPop" width="30%" :close-on-click-modal='false'>
      <el-form :model="classifyForm">
        <el-row>
          <el-col>
            <el-form-item label="分类名称：" label-width="120px">
              <el-input v-model="classifyForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassifyPop = false">取 消</el-button>
        <el-button type="primary" @click="addClassifyConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类名称 -->
    <el-dialog title="编辑分类" :visible.sync="editClassifyPop" width="30%" :close-on-click-modal='false'>
      <el-form :model="editClassifyForm">
        <el-row>
          <el-col>
            <el-form-item label="分类名称：" label-width="120px">
              <el-input v-model="editClassifyForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editClassifyPop = false">取 消</el-button>
        <el-button type="primary" @click="editClassifyConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pagination
      :page="page"
      :total="total"
      :limit="limit"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import pagination from "@/components/pagination"; // 分页
export default {
  components: {
    pagination,
  },
  data() {
    return {
      brandNmae: "",
      //添加分类名称
      classifyForm: {
        name: "",
      },
      // 编辑分类名称
      editClassifyForm: {
        name: "",
      },
      currentPage1: 1,
      addClassifyPop: false, //添加弹窗
      editClassifyPop: false, //编辑弹窗
      tableData: [], //列表数据
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .get(`goods/show_goods_category`, {
          params: {
            page: this.page,
            limit: this.limit,
            name: this.brandNmae,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 搜索
    changeSearch() {
      this.page = 1
      this.getList();
    },
    // 添加分类
    addClassify() {
      this.addClassifyPop = true;
    },
    // 添加分类确定
    addClassifyConfirm() {
      let info = {
        category_name: this.classifyForm.name,
      };
      this.$http.post(`goods/update_goods_category`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.addClassifyPop = false;
          this.$message.success(res.data.message);
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 编辑分类
    editClassify(row) {
      this.id = row.id
      this.editClassifyPop = true;
      this.$http.get(`goods/get_one_category?id=${this.id}`).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.editClassifyForm = res.data.data.data
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 编辑确定
    editClassifyConfirm() {
      let info = {
        id:this.id,
        category_name: this.editClassifyForm.name,
      };
      this.$http.post(`goods/update_goods_category`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editClassifyPop = false;
          this.$message.success(res.data.message);
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 分页下拉
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 分页右滚
    handleSizeChange(val) {
      this.limit = val;
      this.page = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .table_button {
    margin-bottom: 10px;
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>