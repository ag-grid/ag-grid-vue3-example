<template>
  <div class="filter">
    <span class="reset" @click="onResetDate()">x</span>
    <input v-model="dd" class="dd" maxLength="2" placeholder="dd"
           @change="onDateChanged('dd', $event)"/>/
    <input v-model="mm" class="mm" maxLength="2" placeholder="mm"
           @change="onDateChanged('mm', $event)"/>/
    <input v-model="yyyy" class="yyyy" maxLength="4" placeholder="yyyy"
           @change="onDateChanged('yyyy', $event)"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({params: Object})

const date = ref(null);
const dd = ref('');
const mm = ref('');
const yyyy = ref('');

const onResetDate = () => {
  dd.value = '';
  mm.value = '';
  yyyy.value = '';
  date.value = null;
  props.params.onDateChanged();
}

const onDateChanged = (on, $event) => {
  let targetValue = $event.target.value;
  date.value = parseDate(
      on === 'dd' ? targetValue : dd.value,
      on === 'mm' ? targetValue : mm.value,
      on === 'yyyy' ? targetValue : yyyy.value
  );
  props.params.onDateChanged();
}

const getDate = () => {
  return date.value;
}

const setDate = (date) => {
  if (!date) return;

  dd.value = date.getDate() + '';
  mm.value = (date.getMonth() + 1) + '';
  yyyy.value = date.getFullYear() + '';
  date.value = date;
  props.params.onDateChanged();
}

const parseDate = (dd, mm, yyyy) => {
  //If any of the three input date fields are empty, stop and return null
  if (dd.trim() === '' || mm.trim() === '' || yyyy.trim() === '') {
    return null;
  }

  let day = Number(dd);
  let month = Number(mm);
  let year = Number(yyyy);

  let date = new Date(year, month - 1, day);

  //If the date is not valid
  if (isNaN(date.getTime())) {
    return null;
  }

  if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
    return null;
  }
  return date;
}

defineExpose({
  getDate,
  setDate
})
</script>

<style>
.filter {
  margin: 2px
}

.dd {
  width: 30px
}

.mm {
  width: 30px
}

.yyyy {
  width: 60px
}

.reset {
  padding: 2px;
  background-color: red;
  border-radius: 3px;
  font-size: 10px;
  margin-right: 5px;
  color: white
}
</style>
