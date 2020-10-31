<template>
  <div class="analysisRefund">
    <div class="title">
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="medium"
        style="width: 255px"
      >
      </el-date-picker>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 数据总计 -->
    <div class="dataAmount">
      <div class="dataAmount_item" v-for="item in dataNumber" :key="item.id">
        <p>
          <span>{{ item.title }}</span>
          <span></span>
        </p>
        <p>
          <span>近7日</span>
          <span>{{ item.sevenDays }}</span>
        </p>
        <p>
          <span>昨日</span>
          <span>{{ item.yesterday }}</span>
        </p>
      </div>
    </div>
    <!-- 退货（退款产生时间）折线图 -->
    <div class="salesReturn">
      <!-- 头部 -->
      <div class="salesReturn_title">退货（退款产生时间）折线图</div>
      <div class="salesReturn_content">
        <div
          id="salesReturnEcharts"
          :style="{ width: '100%', height: '100%' }"
        ></div>
      </div>
    </div>
    <!-- 退款地域分布 -->
    <div class="arealDistribution">
      <div class="arealDistribution_title">
        <p>
          <span>退款地域分布</span>
          <span>更多></span>
        </p>
      </div>
      <div class="arealDistribution_content">
        <div class="distribution"></div>
        <div class="seniority">
          <el-table
            :data="tableData"
            style="width: 100%; padding: 0 15px"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="date" label="地区 " align="center">
            </el-table-column>
            <el-table-column prop="name" label="订单量" align="center">
            </el-table-column>
            <el-table-column prop="quantity" label="占比" align="center">
              <template>
                <el-progress :percentage="50"></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 退款原因分布 -->
    <div class="refundReason">
      <div class="refundReason_title">退款原因分布</div>
      <div class="refundReason_content">
        <ul>
          <li>
            <span>UNWANTED_ITEM</span>
            <span
              ><el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="70"
              ></el-progress
            ></span>
            <span> 4件 </span>
            <span> $57.96 </span>
          </li>
          <li>
            <span>UNWANTED_ITEM</span>
            <span
              ><el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="70"
              ></el-progress
            ></span>
            <span> 4件 </span>
            <span> $57.96 </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 退款商品统计 -->
    <div class="refundStatistics">
      <div class="refundStatistics_title">退款原因分布</div>
      <div class="refundStatistics_content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="date"
            label="商品信息"
            align="center"
            width="260px"
          >
            <template>
              <div class="commodityNews">
                <img
                  src="https://m.media-amazon.com/images/I/41J8UgbIH5L._SL75_.jpg"
                  alt=""
                />
                <div class="commoditySize">
                  <p>Tomotime Ceramic Tea Cup with Infuser and Lid Tea ...</p>
                  <p>
                    ASIN：
                    <span>B07YCY7WD2</span>
                  </p>
                  <p>
                    SKU：
                    <span>TM023-Z-Black</span>
                  </p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="UNWANTED_ITEM" align="center">
          </el-table-column>
          <el-table-column prop="address" label="DAMAGED_BY_FC" align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="DAMAGED_BY_CARRIER"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="address" label="DEFECTIVE" align="center">
          </el-table-column>
          <el-table-column prop="address" label="其他退款原因" align="center">
          </el-table-column>
          <el-table-column prop="address" label="退款未退货" align="center">
          </el-table-column>
          <el-table-column prop="address" label="FBM退货" align="center">
          </el-table-column>
          <el-table-column prop="address" label="总退货量" align="center">
          </el-table-column>
          <el-table-column prop="address" label="总销售量" align="center">
          </el-table-column>
          <el-table-column prop="address" label="退货率" align="center">
          </el-table-column>
          <el-table-column prop="address" label="退款金额" align="center">
          </el-table-column>
          <el-table-column prop="address" label="退货费用" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 退款订单溯源 -->
    <div class="orderBack">
      <div class="orderBack_title">退款订单溯源</div>
      <div class="orderBack_content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="name"
            label="下单日期(退款订单)"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="该日期订单的退款商品数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="该日期订单的总销量"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="退款商品数占订单总销量"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 买家下单到退款间隔天数统计 -->
    <div class="refundInterval">
      <div class="refundInterval_title">买家下单到退款间隔天数统计</div>
      <div class="refundInterval_content">
        <ul>
          <li>
            <span>UNWANTED_ITEM</span>
            <span
              ><el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="70"
              ></el-progress
            ></span>
            <span> 4件 </span>
            <span> $57.96 </span>
          </li>
          <li>
            <span>UNWANTED_ITEM</span>
            <span
              ><el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="70"
              ></el-progress
            ></span>
            <span> 4件 </span>
            <span> $57.96 </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 近三个月订单溯源退货率 -->
    <div class="orderReturnRate">
      <div class="orderReturnRate_title">近三个月订单溯源退货率</div>
      <div class="orderReturnRate_content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="banner">
                <div class="banner_title">
                  <p>2020年04月 — 2020年06月</p>
                  <p>
                    <span @click="msg = 1" :class="{ tab_active: msg === 1 }"
                      >日历图</span
                    >
                    <span @click="msg = 2" :class="{ tab_active: msg === 2 }"
                      >折线图</span
                    >
                  </p>
                  <p>退货率指标警报设置</p>
                </div>
                <div class="banner_content">
                  <!-- 日历图 -->
                  <div class="calendarFigure" v-show="msg == 1">
                    <ul class="calendar_week">
                      <li>SUN</li>
                      <li>MON</li>
                      <li>TUE</li>
                      <li>WED</li>
                      <li>THU</li>
                      <li>FRI</li>
                      <li>SAT</li>
                    </ul>
                    <div class="chartCard">
                      <div
                        class="chartCard_item"
                        v-for="item in chartCardList"
                        :key="item.id"
                      >
                        <div class="month">{{ item.month }}</div>
                        <ul class="chartCard_list">
                          <li
                            v-for="itemChil in item.children"
                            :key="itemChil.id"
                          >
                            <span class="day">{{ itemChil.day }}</span>
                            <div class="chartCard_size">
                              <p>
                                <i class="el-icon-takeaway-box"></i>
                                <span>{{ itemChil.boxNum }}</span>
                              </p>
                              <p>
                                <i class="el-icon-top-left"></i>
                                <span>{{ itemChil.shareNum }}</span>
                              </p>
                              <p>
                                <span>{{ itemChil.percentage }}%</span>
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- 折线图 -->
                  <div class="lineChart" v-show="msg == 2">
                    <div class="chart">
                      <div
                        class="chart_item"
                        v-for="item in refundEchartList"
                        :key="item.id"
                      >
                        <div class="month">{{ item.month }}</div>
                        <div class="calendar-graph">
                          <div
                            class="roseChart"
                            :style="{ width: '100%', height: '250px' }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="banner">
                <div class="banner_title">
                  <p>2020年06月 —— 2020年09月</p>
                  <p>
                    <span @click="msg = 1" :class="{ tab_active: msg === 1 }"
                      >日历图</span
                    >
                    <span @click="msg = 2" :class="{ tab_active: msg === 2 }"
                      >折线图</span
                    >
                  </p>
                  <p>退货率指标警报设置</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Add Arrows -->
          <div
            class="swiper-button-next rightButton"
            @click="rightButton"
          ></div>
          <div class="swiper-button-prev leftButton" @click="leftButton"></div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "", //日期
      msg: 2,
      refundEchartList: [
        {
          id: 1,
          month: "八月",
          x: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
          y: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
          title: ["销售量", "退货量", "退货率"],
          resData: [
            {
              name: "销售量",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "退货量",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "退货率",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410],
            },
          ],
        },
        {
          id: 2,
          month: "九月",
          x: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
          y: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
          title: ["销售量", "退货量", "退货率"],
          resData: [
            {
              name: "销售量",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "退货量",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "退货率",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410],
            },
          ],
        },
        {
          id: 3,
          month: "十月",
          x: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
          y: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
          title: ["销售量", "退货量", "退货率"],
          resData: [
            {
              name: "销售量",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "退货量",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "退货率",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 1410],
            },
          ],
        },
      ],
      chartCardList: [
        {
          id: 1,
          month: "4月",
          children: [
            {
              id: 1,
              day: 1,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 2,
              day: 2,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 3,
              day: 3,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 4,
              day: 4,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 5,
              day: 5,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 6,
              day: 6,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 7,
              day: 7,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 8,
              day: 8,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 9,
              day: 9,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 10,
              day: 10,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 11,
              day: 11,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 12,
              day: 12,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 13,
              day: 13,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 14,
              day: 14,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 15,
              day: 15,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 16,
              day: 16,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 17,
              day: 17,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 18,
              day: 18,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 19,
              day: 19,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 20,
              day: 20,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 21,
              day: 21,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 22,
              day: 22,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 23,
              day: 23,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 24,
              day: 24,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 25,
              day: 25,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 26,
              day: 26,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 27,
              day: 27,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 28,
              day: 28,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 29,
              day: 29,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 30,
              day: 30,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
          ],
        },
        {
          id: 2,
          month: "5月",
          children: [
            {
              id: 1,
              day: 1,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 2,
              day: 2,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 3,
              day: 3,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 4,
              day: 4,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 5,
              day: 5,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 6,
              day: 6,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 7,
              day: 7,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 8,
              day: 8,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 9,
              day: 9,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 10,
              day: 10,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 11,
              day: 11,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 12,
              day: 12,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 13,
              day: 13,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 14,
              day: 14,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 15,
              day: 15,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 16,
              day: 16,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 17,
              day: 17,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 18,
              day: 18,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 19,
              day: 19,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 20,
              day: 20,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 21,
              day: 21,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 22,
              day: 22,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 23,
              day: 23,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 24,
              day: 24,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 25,
              day: 25,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 26,
              day: 26,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 27,
              day: 27,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 28,
              day: 28,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 29,
              day: 29,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 30,
              day: 30,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
          ],
        },
        {
          id: 3,
          month: "6月",
          children: [
            {
              id: 1,
              day: 1,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 2,
              day: 2,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 3,
              day: 3,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 4,
              day: 4,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 5,
              day: 5,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 6,
              day: 6,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 7,
              day: 7,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 8,
              day: 8,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 9,
              day: 9,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 10,
              day: 10,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 11,
              day: 11,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 12,
              day: 12,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 13,
              day: 13,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 14,
              day: 14,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 15,
              day: 15,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 16,
              day: 16,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 17,
              day: 17,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 18,
              day: 18,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 19,
              day: 19,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 20,
              day: 20,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 21,
              day: 21,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 22,
              day: 22,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 23,
              day: 23,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 24,
              day: 24,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 25,
              day: 25,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 26,
              day: 26,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 27,
              day: 27,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 28,
              day: 28,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 29,
              day: 29,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
            {
              id: 30,
              day: 30,
              boxNum: 0,
              shareNum: 0,
              percentage: 0.0,
            },
          ],
        },
      ],
      dataNumber: [
        {
          id: 1,
          title: "退货商品数",
          sevenDays: 8,
          yesterday: 0,
        },
        {
          id: 2,
          title: "销售商品数",
          sevenDays: 674,
          yesterday: 72,
        },
        {
          id: 3,
          title: "退货率",
          sevenDays: "1.19%",
          yesterday: "0.00%",
        },
        {
          id: 4,
          title: "退款金额",
          sevenDays: "$138.93",
          yesterday: "$0.00",
        },
        {
          id: 5,
          title: "退款费用",
          sevenDays: "$3.77",
          yesterday: "$0.00",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-04",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-01",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-03",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-03",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
      ],
      // 日期快捷方式
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.salesEcharts();
    this.refundChart();
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  },
  methods: {
    rightButton() {
      console.log(1);
    },
    leftButton() {
      console.log(2);
    },
    salesEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("salesReturnEcharts")
      );
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "axis",
        },
        legend: {
          padding: [20, 0, 0, 0],
          data: ["总退货量", "FBA退货量", "FBM退货量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "6%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "总退货量",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "FBA退货量",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "FBM退货量",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      });
      window.onresize = myChart.resize;
    },
    // 近三个月订单溯源退货率折线图
    refundChart() {
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      var roseCharts = document.getElementsByClassName("roseChart"); // 对应地使用ByClassName
      for (var i = 0; i < roseCharts.length; i++) {
        var myChart = echarts.init(roseCharts[i]);
        // 绘制图表
        myChart.setOption({
          title: {},
          tooltip: {
            trigger: "axis",
          },
          legend: {
            padding: [20, 0, 0, 0],
            data: this.refundEchartList[i].title,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "6%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.refundEchartList[i].x,
          },
          yAxis: {
            type: "value",
          },
          series: this.refundEchartList[i].resData,
        });
        window.onresize = myChart.resize;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title{
  margin-bottom: 15px;
}
// 数据总计
.dataAmount {
  width: 100%;
  height: 150px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  //   align-items: center;
  .dataAmount_item {
    height: 110px;
    width: 20%;
    padding: 0 55px;
    line-height: 35px;
    border-right: 1px solid #869fa6;
    p {
      display: flex;
      justify-content: space-between;
    }
    p:nth-of-type(1) {
      font-size: 14px;
      color: #073b49;
    }
    p:nth-of-type(2) {
      span:nth-of-type(1) {
        font-size: 14px;
        color: #073b49;
      }
      span:nth-of-type(2) {
        font-size: 22px;
        font-weight: bold;
        color: #409eff;
      }
    }
    p:nth-of-type(3) {
      span:nth-of-type(1) {
        font-size: 14px;
        color: #073b49;
      }
      span:nth-of-type(2) {
        font-size: 22px;
        font-weight: bold;
        color: #409eff;
      }
    }
  }
  .dataAmount_item:last-child {
    border-right: none;
  }
}
// 退货（退款产生时间）折线图
.salesReturn {
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  .salesReturn_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
    padding: 21px 1.8% 10px;
  }
  .salesReturn_content {
    width: 100%;
    height: 85%;
  }
}
// 退款地域分布
.arealDistribution {
  width: 100%;
  height: 390px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  .arealDistribution_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
    padding: 21px 1.8% 10px;
    p {
      display: flex;
      justify-content: space-between;
      span:nth-of-type(2) {
        color: #999;
        font-size: 14px;
      }
    }
  }
  .arealDistribution_content {
    padding: 10px 1.8% 10px;
    width: 100%;
    height: 75%;
    // background: salmon;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .distribution {
      width: 55%;
      height: 100%;
      border-radius: 4px;
      border: 1px solid #d6d6d6;
      //   background: floralwhite;
    }
    .seniority {
      width: 43%;
      height: 100%;
      //   background: goldenrod;
      border-radius: 4px;
      border: 1px solid #d6d6d6;
      padding: 5px;
      box-sizing: border-box;
      /deep/.el-table td,
      .el-table th {
        padding: 10px 0;
      }
    }
  }
}
//退款原因分布
.refundReason {
  width: 100%;
  //   height: 180px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  .refundReason_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
    padding: 21px 1.8% 10px;
  }
  .refundReason_content {
    padding: 20px 100px;
    ul {
      li {
        margin-top: 20px;
        span {
          display: inline-block;
        }
        span:nth-of-type(1) {
          font-size: 14px;
          padding-right: 5px;
          text-align: right;
          width: 170px;
        }
        span:nth-of-type(2) {
          width: 600px;
        }
        span:nth-of-type(3) {
          font-size: 14px;
          padding-left: 15px;
          font-weight: bold;
        }
        span:nth-of-type(4) {
          font-size: 14px;
          padding-left: 15px;
        }
      }
    }
  }
}
// 退款商品统计
.refundStatistics {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  padding: 21px 1.8% 30px;
  box-sizing: border-box;
  .refundStatistics_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
  }
  .refundStatistics_content {
    margin-top: 15px;
    .commodityNews {
      display: flex;
      justify-content: space-between;
      text-align: left;
      img {
        width: 48px;
        height: 48px;
        margin: 20px 10px 0 0;
      }
      .commoditySize {
        font-size: 12px;
        p {
          span {
            color: #6699ff;
          }
        }
      }
    }
  }
}
// 退款订单溯源
.orderBack {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  padding: 21px 1.8% 30px;
  box-sizing: border-box;
  .orderBack_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
  }
  .orderBack_content {
    margin-top: 15px;
  }
}
//买家下单到退款间隔天数统计
.refundInterval {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  padding: 21px 1.8% 30px;
  box-sizing: border-box;
  .refundInterval_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
  }
  .refundInterval_content {
    padding: 20px 100px;
    ul {
      li {
        margin-top: 20px;
        span {
          display: inline-block;
        }
        span:nth-of-type(1) {
          font-size: 14px;
          padding-right: 5px;
          text-align: right;
          width: 170px;
        }
        span:nth-of-type(2) {
          width: 600px;
        }
        span:nth-of-type(3) {
          font-size: 14px;
          padding-left: 15px;
          font-weight: bold;
        }
        span:nth-of-type(4) {
          font-size: 14px;
          padding-left: 15px;
        }
      }
    }
  }
}
//近三个月订单溯源退货率
.orderReturnRate {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdcdc;
  margin-top: 15px;
  box-sizing: border-box;
  .orderReturnRate_title {
    color: #073b49;
    font-size: 18px;
    font-weight: bold;
    padding: 21px 1.8% 15px;
  }
  .orderReturnRate_content {
    position: relative;
    // swiper左右按钮样式
    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 22px;
      color: #000;
    }
    .rightButton {
      position: absolute;
      top: 10px;
      left: 245px;
    }
    .leftButton {
      position: absolute;
      top: 10px;
      left: 20px;
    }
    .banner {
      width: 100%;
      // background: saddlebrown;
      .banner_title {
        display: flex;
        justify-content: space-between;
        padding: 0 25px;
        height: 30px;
        p:nth-of-type(1) {
          font-size: 14px;
          color: #333;
          margin-left: 25px;
        }
        p:nth-of-type(2) {
          span {
            cursor: pointer;
            color: #333;
          }
          .tab_active {
            font-weight: bold;
            color: #409eff;
            border-bottom: 3px solid #409eff;
          }
          span:nth-of-type(1) {
            display: inline-block;
            margin-right: 20px;
          }
        }
      }
      .banner_content {
        // 日历图
        .calendarFigure {
          .calendar_week {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            padding: 0 40px;
            li {
              color: #666;
              font-size: 12px;
            }
          }
          .chartCard {
            padding: 0 0 20px 0;
            .chartCard_item {
              display: flex;
              justify-content: space-between;
              margin-top: 15px;
              .month {
                width: 40px;
                color: #666;
                padding-right: 4px;
                font-weight: bold;
                text-align: center;
                line-height: 120px;
              }
              .chartCard_list {
                width: 100%;
                border-left: 5px solid #27b8d0;
                display: flex;
                flex-wrap: wrap;
                margin-top: 10px;
                li {
                  width: 16%;
                  height: 30px;
                  border-top: 1px solid #cbcbcb;
                  .day {
                    display: inline-block;
                    width: 25px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #f5f5f5;
                    float: left;
                  }
                  .chartCard_size {
                    float: left;
                    display: flex;
                    line-height: 30px;
                    p:nth-of-type(1) {
                      margin: 0 15px 0 10px;
                    }
                    p:nth-of-type(2) {
                      margin: 0 15px 0 10px;
                    }
                    p:nth-of-type(3) {
                      margin: 0 15px 0 10px;
                      color: #6699ff;
                    }
                  }
                }
              }
            }
          }
        }
        // 折线图
        .lineChart {
          .chart {
            .chart_item {
              display: flex;
              justify-content: space-between;
              width: 100%;
              .month {
                width: 5%;
                height: 185px;
                color: #666;
                padding-right: 4px;
                font-weight: bold;
                text-align: center;
                margin-top: 50px;
                line-height: 170px;
                border-right: 5px solid #27b8d0;
              }
              .calendar-graph {
                width: 95%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
