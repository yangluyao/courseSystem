
 <template>
    <el-pagination :small="true"
      :total="total"
      @size-change="handleSize"
      @current-change="handleCurrent"
      :current-page="page"
      :page-sizes="[10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </template>

 <script>
    export default {
      name: 'pegitation',
      props: {
        total: Number,
        currentPage: Number,
        pagesize: Number,
        handleSizeChange: Function,
        handleCurrentChange: Function
      },
      data() {
        return {
          page: this.currentPage
        }
  },
      methods: {
        handleSize(val) {
          // console.log(val)
          this.handleSizeChange(val)
        },
        handleCurrent(val) {
          // console.log(val)
          this.handleCurrentChange(val)
        }
      }
    }
  </script>




