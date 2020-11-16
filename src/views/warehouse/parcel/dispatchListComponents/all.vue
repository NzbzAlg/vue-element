<template>
  <div class="all">
    <div class="table_button">
      <el-button type="primary" size="small">分配库存</el-button>
      <el-button type="primary" size="small">发货</el-button>
      <el-dropdown split-button size="small" style="margin-left: 10px">
        更多操作
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>释放库存</el-dropdown-item>
          <!-- <el-dropdown-item>
            <span @click="ImportLogistics">导入物流信息</span>
          </el-dropdown-item> -->
          <el-dropdown-item>批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="详情" type="expand" width="60">
        <template slot-scope="scope">
          <el-table border :data="scope.row.children">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="goodsSupId"
              label="图片"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsName"
              label="MSKU/FNSKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsOriginPrice"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment"
              label="发货量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsType"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="货件单号"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center">
              <template>
                <el-dropdown split-button size="small" @click="details">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>分配库存</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <!-- <span>生成加工单</span> -->
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>
                <span>打印</span>
              </el-dropdown-item> -->
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column
        prop="channel_name"
        label="计划单号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="shipment_name"
        label="发货仓库"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="shipment_id"
        label="默认仓库"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SKU"
        label="物流方式"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SKU"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SKU"
        label="发货时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SKU"
        label="预计到货时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SKU"
        label="配送地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="SKU"
        label="物流信息"
        align="center"
      ></el-table-column>
      <el-table-column prop="SKU" label="状态" align="center"></el-table-column>
    </el-table>
    <!-- 详情 -->
    <Details :detailsClose.sync="detailsClose" />
  </div>
</template>

<script>
import Details from "./details"; // 详情
export default {
  components: {
    Details,
  },
  data() {
    return {
      detailsClose: false, //详情弹窗关闭
      tableData: [
        {
          shipment_id: "FBA15LLFLLP9",
          channel_name: "tomotime_US",
          children:[
            {
              shipment:1
            },
            {
              shipment:11
            }
          ]
        },
        {
          shipment_id: "FBA15LLFLLP9",
          channel_name: "tomotime_US",
          children:[
            {
              shipment:2
            }
          ]
        },
      ],
    };
  },
  methods: {
    details() {
      this.detailsClose = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.table_button {
  margin-bottom: 10px;
}
</style>