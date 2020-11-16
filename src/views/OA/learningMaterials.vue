<template>
  <div class="learningMaterials">
    <!-- 头部 -->
    <div class="title">
      <el-input
        v-model="name"
        placeholder="搜索标题名称"
        clearable
        size="medium"
        style="width: 150px"
      ></el-input>
      <el-button
        type="primary"
        size="medium"
        style="margin-left: 10px"
        @click="search"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button type="primary" size="small" @click="uploadData"
          >上传资料</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="name"
          label="标题"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_man"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="success" @click="editBrand(scope.row)"
              >查看PPT</el-button
            > -->
            <!-- <a :href="'https://view.officeapps.live.com/op/view.aspx'+scope.row.url">查看PPT</a> -->
            <el-button size="mini" type="success" @click="viewVideo(scope.row)" 
              >查看视频</el-button
            >
            <el-button size="mini" type="success" @click="edit(scope.row)" v-if="scope.row.show == 1"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="remove(scope.row)" v-if="scope.row.show == 1"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 上传资料弹窗 -->
    <el-dialog title="上传资料" :visible.sync="uploadDataPop" width="30%" :close-on-click-modal='false'>
      <el-form :model="uploadDataForm">
        <el-row>
          <el-col>
            <el-form-item label="标题：" label-width="120px" :required="true">
              <el-input v-model="uploadDataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="路径：" label-width="120px">
              <el-upload
                class="upload-demo"
                ref="upload"
                :multiple="false"
                action="void"
                :http-request="uploadFile"
                :on-remove="handleRemove"
                :on-progress="progressA"
                :file-list="fileList"
                :auto-upload="true"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取文件</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDataPop = false">取 消</el-button>
        <el-button type="primary" @click="uploadDataConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看视频弹窗 -->
    <el-dialog :title="namePop" :visible.sync="viewVideoPop" width="70%" :close-on-click-modal='false'>
      <div class="video">
        <video
          :src="$store.state.url + videoUrl"
          controls
          controlsList="nodownload"
          style="width: 100%; height: 100%"
        ></video>
        <!-- object-fit:fill -->
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="editPop" width="40%" :close-on-click-modal='false'>
      <el-form :model="editUploadDataForm">
        <el-row>
          <el-col>
            <el-form-item label="标题：" label-width="120px">
              <el-input v-model="editUploadDataForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="路径：" label-width="120px">
              <el-upload
                class="upload-demo"
                ref="upload"
                :multiple="false"
                action="void"
                :http-request="uploadFile"
                :on-remove="handleRemove"
                :on-progress="progressA"
                :file-list="fileList"
                :auto-upload="true"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取文件</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="人员：" label-width="120px">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText"
                style="width: 180px; margin-bottom: 10px"
              >
              </el-input>
              <el-tree
                class="filter-tree"
                :data="editTree"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="defaultProps"
                :default-checked-keys="roleWarehouseTable"
                :filter-node-method="filterNode"
              >
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPop = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
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
      roleWarehouseTable: [], //角色数据
      name: "",
      //添加品牌名称
      uploadDataForm: {
        name: "",
      },
      // 编辑品牌名称
      editUploadDataForm: {
        name: "",
      },
      uploadDataPop: false, //上传资料弹窗
      viewVideoPop: false, //查看视频弹窗
      editPop: false, //编辑弹窗
      filterText: "", //编辑过滤
      tableData: [], //列表数据
      videoUrl: "",
      namePop: "",
      page: 1,
      limit: 10,
      total: 0,
      editTree: [], //编辑树
      fileList: [],
      defaultProps: {
        children: "user",
        label: "name",
      },
      popUrl: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    filterNode(value, editTree) {
      if (!value) return true;
      return editTree.name.indexOf(value) !== -1;
    },

    getList() {
      this.$http
        .get(`oa/Learning_materials`, {
          params: {
            page: this.page,
            limit: this.limit,
            name: this.name,
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
    search() {
      this.getList();
    },
    // 上传资料弹窗
    uploadData() {
      this.uploadDataPop = true;
    },
    uploadFile(file) {
      let FormDatas = new FormData();
      FormDatas.append("file", file.file);
      this.$http({
        url: "upload/upload_file",
        method: "post",
        data: FormDatas,
        //上传进度
        onUploadProgress: (progressEvent) => {
          let num = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //百分比
          file.onProgress({ percent: num }); //进度条
        },
      }).then((data) => {
        this.popUrl = data.data.data;
        file.onSuccess(); //上传成功(打钩的小图标)
      });
    },
    /**     文件正在上传时的钩子    **/
    progressA(event, file) {},
    /**     移除上传文件    **/
    handleRemove(file) {
      this.popUrl = ''
      this.$http.get(`upload/del_file?url=${this.popUrl}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
      this.$refs.upload.abort(); //取消上传
      // this.$message({ message: "成功移除" + file.name, type: "success" });
    },
    // 上传资料弹窗确定
    uploadDataConfirm() {
      if (this.uploadDataForm.name == "") {
        this.$message.error("上传标题不能为空");
      } else {
        let info = new FormData();
        info.append("name", this.uploadDataForm.name);
        info.append("url", this.popUrl);
        this.$http.post(`oa/new_materials`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.uploadDataPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 查看视频弹窗
    viewVideo(row) {
      this.viewVideoPop = true;
      this.videoUrl = row.url;
      this.namePop = row.name;
    },
    // 编辑弹窗
    edit(row) {
      this.id = row.id;
      this.editPop = true;
      this.$http.get(`oa/get_one_materials?id=${this.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editUploadDataForm = res.data.data;
          this.roleWarehouseTable = res.data.data.user_rights;
        } else {
          this.$message.error(res.data.message);
        }
      });
      this.$http.get(`user/get_userBydepartment`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editTree = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 编辑确定
    editConfirm() {
      this.pageId = this.$refs.tree.getCheckedKeys();
      let info = new FormData();
      info.append("id", this.id);
      info.append("name", this.editUploadDataForm.name);
      info.append("url", this.popUrl);
      info.set("user_rights", this.pageId);
      this.$http.post(`oa/new_materials`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.editPop = false;
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 删除
    remove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get(`oa/del_materials?id=${row.id}`).then((res) => {
            const { code, data } = res.data;
            if (code == 200) {
              this.$message.success(res.data.message);
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
.video {
  width: 100%;
  height: 500px;
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>