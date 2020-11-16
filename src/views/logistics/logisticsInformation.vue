<template>
  <div class="logisticsInformation">
    <div class="title">
      <el-button size="small" type="primary" @click="addLogistics"
        >添加物流商</el-button
      >
    </div>
    <div class="content">
      <div class="left-list">
        <el-collapse>
          <el-collapse-item
            :title="item.title"
            v-for="(item, index) in foldedPanel"
            :key="index"
          >
            <div
              style="height: 40px; line-height: 40px; background: #f2f2f2"
              v-for="(itemChildren, index) in item.children"
              :key="index"
              @click="tab(index)"
            >
              {{ itemChildren.name }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right-page">
        <div
          v-for="(itemCon, index) in tabContents"
          v-show="index == num"
          :key="index"
          class="pageContent"
        >
          <p class="title">云图</p>
          <!-- api接口设置 -->
          <div class="api-set">
            <span class="api-size">API接口设置</span>
            <span class="api-size" style="cursor: pointer" @click="edit"
              >编辑</span
            >
            <div class="api-container" v-show="isShowSize">
              <div class="api-line">ApiSecret</div>
              <div class="api-line">客户编号</div>
              <div class="api-line">
                <span>包裹投保类型</span>
                <span>最高金额</span>
              </div>
              <div class="api-line">
                <span>是否退回</span>
                <span>包裹无人签收时不退回</span>
              </div>
            </div>
            <div class="api-edit" v-show="isShowInput">
              <el-form :model="editForm" label-width="120px">
                <el-col :span="8">
                  <el-form-item label="ApiSecret">
                    <el-input v-model="editForm.name" size="medium "></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户编号">
                    <el-input v-model="editForm.name" size="medium "></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="包裹投保类型">
                    <el-select
                      v-model="editForm.name"
                      placeholder="配对"
                      clearable
                      filterable
                      size="medium"
                      style="width: 150px; margin-left: 10px"
                      @change="changeSearch()"
                    >
                      <el-option
                        v-for="item in PackageType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最高限额">
                    <el-input v-model="editForm.name" size="medium "></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否退回">
                    <el-checkbox v-model="checked">包裹无人签收时退回</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </div>
          <!-- 物流方式 -->
          <div class="logistics-style">
            <span class="api-size">物流方式</span>
            <span class="api-size">同步物流方式</span>
            <el-table
              :data="tableData"
              border
              style="width: 100%; margin-top: 15px"
            >
              <el-table-column
                prop="date"
                label="启用"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="代码"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="名称" align="center">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作"
                width="180"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加物流商弹窗 -->
    <el-dialog title="添加物流商" :visible.sync="addLogisticsPop" width="40%">
      <div class="custom">
        <p class="title">API对接物流商</p>
        <p class="descript">
          系统已内置了行业内用户使用数较多，口碑较好的一些物流商，您可以根据需要选择并启用。
        </p>
        <p style="margin-left: 10px">
          <span>物流商</span>
          <el-input
            placeholder="物流商"
            style="margin-left: 10px; width: 260px"
          ></el-input>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addLogisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="addLogisticsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foldedPanel: [
        {
          title: "第三方物流商",
          children: [
            {
              id: 1,
              name: "云图",
            },
            {
              id: 2,
              name: "云图1",
            },
          ],
        },
      ],
      addLogisticsPop: false, //添加物流商弹窗
      tableData: [],
      num: "",
      tabContents: ["内容一", "内容二", "内容三"],
      isShowSize: true,
      isShowInput: false,
      editForm: {},
      // 包裹类型
      PackageType: [
        {
          id: 1,
          name: "不参保",
        },
        {
          id: 2,
          name: "按件",
        },
        {
          id: 3,
          name: "按比例",
        },
      ],
      checked: false,
    };
  },
  methods: {
    tab(index) {
      this.num = index;
    },
    // 添加物流商
    addLogistics() {
      this.addLogisticsPop = true;
    },
    // 编辑
    edit() {
      this.isShowSize = !this.isShowSize;
      this.isShowInput = !this.isShowInput;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 15px;
}
.content {
  background: #fff;
  height: 100%;
  width: 100%;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  flex: 1;
  .left-list {
    width: 400px;
    height: 100%;
    border-right: 1px solid #ddd;
    padding: 20px;
    // float: left;
  }
  .right-page {
    // float: left;
    width: 100%;
    box-sizing: border-box;
    .pageContent {
      padding: 20px;
      .title {
        font-size: 16px;
        color: #000;
      }
      // 接口设置
      .api-set {
        margin-top: 16px;
        font-size: 12px;
        .api-size:nth-of-type(1) {
          color: #000;
          font-weight: bold;
        }
        .api-size:nth-of-type(2) {
          color: #006eff;
          padding-left: 15px;
        }
        .api-container {
          padding: 12px 20px;
          border-radius: 2px;
          border: 1px solid #ddd;
          margin-top: 5px;
          .api-line {
            margin: 4px 8px 8px 0;
            font-weight: 700;
            color: #888;
            span:nth-of-type(2) {
              padding-left: 15px;
            }
          }
        }
        .api-edit {
          height: 108px;
          padding: 12px 20px;
          border-radius: 2px;
          border: 1px solid #ddd;
          margin-top: 5px;
        }
      }
      // 物流方式
      .logistics-style {
        margin-top: 16px;
        font-size: 12px;
        .api-size:nth-of-type(1) {
          color: #000;
          font-weight: bold;
        }
        .api-size:nth-of-type(2) {
          color: #006eff;
          padding-left: 15px;
        }
      }
    }
  }
}
// 添加物流商弹窗
.custom {
  .title {
    font-weight: 700;
    margin: 0px 10px 10px;
    font-size: 14px;
    color: #000;
  }
  .descript {
    color: #444;
    margin: 0 10px 12px;
    font-size: 14px;
  }
}
</style>