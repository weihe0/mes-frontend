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
        <v-table>
          <thead><tr><th>订单</th><th>位置</th><th>颜色</th><th>动作</th></tr></thead>
          <tbody>
          <tr v-for="(plc_var, index) of plc_variables"><td>{{ plc_var.order }}</td><td>{{ plc_var.position }}</td>
            <td>{{ plc_var.color }}</td><td><v-btn icon @click="remove(index)"><v-icon icon="mdi-delete"></v-icon></v-btn></td></tr>
          </tbody>
        </v-table>
        <div class="text-center">
          <v-btn
            block
            color="primary"
            @click="dialog = true"
            class="ma-2"
          >
            新增订单
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
                  label="订单"
                ></v-text-field>

                <v-text-field
                  v-model="new_position"
                  clearable
                  label="位置"
                ></v-text-field>

                <v-text-field
                  v-model="new_color"
                  clearable
                  label="颜色"
                ></v-text-field>

                <v-btn
                  block
                  color="success"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  新增订单
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
  { text: '人员管理', icon: 'mdi-account', path: '/personnel' },
])
</script>
