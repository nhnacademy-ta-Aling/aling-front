<script setup>
import BasicInput from "@/components/commons/BasicInput.vue";
</script>

<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <h2>Aling에 오신것을 환영합니다!</h2>
      </div>
    </el-col>
    <el-col>
      <p>inputbox test:</p>
      <BasicInput
        type="password"
        placeholder="비밀번호를 입력해주세요."
        name="loginId"
        required
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  background: white;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
h2 {
  color: black;
}
</style>
