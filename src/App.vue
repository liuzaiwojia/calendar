/*
 * @Author: liujia
 * @Date: 2018-11-24 10:29:06
 * @Last Modified by: liujia
 * @Last Modified time: 2019-10-14 11:09:39
 * @description: 日历组件
 每一个planItem都应该有start(Date类型), end(Date类型), color, name四个属性，其他属性随意
 */
<template>
  <div class="crm-calendar">
    <!-- 上个月图标、当前年月、下个月图标 -->
    <div class="month-select">
      <div @click="prevMonth" class="prev"><i class="el-icon-arrow-left"></i></div>
      <div class="month-descript">{{ monthDescript }}</div>
      <div @click="nextMonth" class="next"><i class="el-icon-arrow-right"></i></div>
    </div>
    <ul class="week-display">
      <li>星期天</li>
      <li>星期一</li>
      <li>星期二</li>
      <li>星期三</li>
      <li>星期四</li>
      <li>星期五</li>
      <li>星期六</li>
    </ul>
    <ul class="date-display">
      <li class="week-row" v-for="(weeks, weekIndex) in splitedCalendar" :key="weekIndex">
        <ul>
          <li class="date-item" v-for="(item, index) in weeks" :key="index">
            <!-- 当天用蓝色的线标注 -->
            <div class="current-day-place">
              <div class="current-day-mark"
              v-if="currentDay.getFullYear() === item.year && currentDay.getMonth() === item.month && currentDay.getDate() === item.date"></div>
            </div>
            <!-- 本月与非本月的日期展示的颜色稍有差别 -->
            <div class="date-display-name"
              :class="{'no-current-month': month !== item.month}">{{ item.date }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CrmCalendar',
  data () {
    return {
      calendar: [],
      currentDay: new Date(),
      splitedCalendar: [],
      firstDay: null,
      year: null,
      month: null,
      totalWeeks: 6
    }
  },
  computed: {
    monthDescript () {
      return `${this.year}年${this.month + 1}月`
    }
  },
  mounted () {
    this.$nextTick(() => {
      const today = new Date()
      this.init(today.getFullYear(), today.getMonth())
    })
  },
  methods: {
    /**
     * @description 初始化日历
     */
    async init (year, month) {
      this.year = year
      this.month = month
      this.initFirstDay(new Date(this.year, this.month, 1))
      this.calendar = []
      this.initCalendarDays()
      // 将日历以周为单位分成一行
      this.initSplitedCalendar()
    },
    /**
     * @description 初始化日历的第一天
     */
    initFirstDay (firstMonthDay) {
      const Weekday = firstMonthDay.getDay()
      this.firstDay = new Date(firstMonthDay.getFullYear(), firstMonthDay.getMonth(), firstMonthDay.getDate() - Weekday)
    },
    /**
     * @description 将完整的日历列表按周分割
     */
    initSplitedCalendar () {
      this.splitedCalendar = []
      for (let i = 0; i < this.totalWeeks; i++) {
        this.splitedCalendar.push(this.calendar.slice(7 * i, 7 + 7 * i))
      }
    },
    /**
     * @description 初始化日历
     */
    initCalendarDays () {
      for (let i = 0; i < 7 * this.totalWeeks; i++) {
        const thisDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + i)
        this.calendar.push({
          year: thisDay.getFullYear(),
          // 月份：0 ~ 11
          month: thisDay.getMonth(),
          isCurrentMonth: true,
          date: thisDay.getDate(),
          // 星期几：0 ~ 6
          day: thisDay.getDay()
        })
      }
    },
    /**
     * @description 上一个月
     */
    prevMonth () {
      const prevMonthFirstDay = new Date(this.year, this.month - 1, 1)
      this.init(prevMonthFirstDay.getFullYear(), prevMonthFirstDay.getMonth())
    },
    /**
     * @description 下一个月
     */
    nextMonth () {
      const prevMonthFirstDay = new Date(this.year, this.month + 1, 1)
      this.init(prevMonthFirstDay.getFullYear(), prevMonthFirstDay.getMonth())
    }
  }
}
</script>

<style lang='scss' scoped type='text/css'>
$week-height: 26px;
$date-min-height: 120px;
$item-padding: 10px;

.crm-calendar{
  width: 100%;
  background: white;
  .month-select{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #DCDFE6;
    .prev{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      font-weight: 700;
      &:hover{
        color: blue;
      }
    }
    .month-descript{
      width: 160px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }
    .next{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      font-weight: 700;
      &:hover{
        color: blue;
      }
    }
  }
  .week-display{
    width: 100%;
    height: $week-height;
    line-height: $week-height;
    border-bottom: 1px solid #DCDFE6;
    font-weight: 600;
    background: #eff2f4;
    >li{
      width: calc(100% / 7);
      height: $week-height;
      line-height: $week-height;
      float: left;
      padding-left: $item-padding;
    }
    li + li{
      border-left: 1px solid #DCDFE6;
    }
  }
  .date-display{
    width: 100%;
    .week-row{
      width: 100%;
      min-height: $date-min-height;
      border-bottom: 1px solid #DCDFE6;
      >ul{
        width: 100%;
        display: flex;
        align-items: stretch;
      }
      .date-item{
        width: calc(100% / 7);
        min-height: $date-min-height;
        float: left;
        padding-bottom: 5px;
        cursor: pointer;
        .current-day-place{
          width: 100%;
          height: 5px;
          margin: 2px 0 3px 0;
          padding: 0 $item-padding;
          .current-day-mark{
            width: 100%;
            height: 100%;
            background: #409EFF;
          }
        }
        .date-display-name{
          width: 100%;
          height: 20px;
          line-height: 20px;
          padding-left: $item-padding;
          user-select: none;
        }
        .no-current-month{
          color: #909399;
        }
      }
      .date-item + .date-item{
        border-left: 1px solid #DCDFE6;
      }
    }
  }
}
</style>
