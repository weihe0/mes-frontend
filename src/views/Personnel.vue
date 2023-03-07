<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>制造执行系统 Manufacture Executing System</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-subheader>功能列表</v-list-subheader>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          active-color="primary"
          class="ma-4"
          :to="item.path"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <v-container>
        <div class="flex-wrap">
          <v-card class="pa-2 ma-2"
            title="张三"
            subtitle="维修工程师"
            text="张三是维修工程师"
          >
          </v-card>
          <v-card class="pa-2 ma-2"
                  title="李四"
                  subtitle="现场工程师"
                  text="李四是维修工程师"
          >
          </v-card>
        </div>
        <div class="text-center">
          <v-btn
            block
            color="primary"
            @click="dialog = true"
            class="ma-2"
          >
            新增人员
          </v-btn>

          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card class="mx-auto px-6 py-8" min-width="20rem">
              <v-form
                @submit.prevent="add"
              >
                <v-text-field
                  v-model="new_order"
                  class="mb-2"
                  clearable
                  label="姓名"
                ></v-text-field>

                <v-text-field
                  v-model="new_position"
                  clearable
                  label="职务"
                ></v-text-field>

                <v-text-field
                  v-model="new_color"
                  clearable
                  label="简介"
                ></v-text-field>

                <v-btn
                  block
                  color="success"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  新增人员
                </v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref} from "vue";

const drawer=ref(false);
const plc_variables=ref([
  {order: '1号订单', position:0, color:'红色'},
  {order: '2号订单', position: 0, color: '绿色'}
]);
const dialog=ref(false);
const new_order=ref('');
const new_position=ref(0);
const new_color=ref('');
const add = () =>{
  plc_variables.value.push({order: new_order.value,position: new_position.value,color: new_color.value});
  dialog.value=false;
}
const remove = (index: number) => {
  plc_variables.value.splice(index,1);
}
const items = ref([
  { text: 'PLC管理', icon: 'mdi-robot-industrial', path: '/' },
  { text: '订单管理', icon: 'mdi-file-document', path: '/order'},
  { text: '人员管理', icon: 'mdi-account', path: '/' },
])
</script>
