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
          <thead><tr><th>变量</th><th>值</th><th>注释</th><th>动作</th></tr></thead>
          <tbody>
          <tr v-for="(plc_var, index) of plc_variables"><td>{{plc_var.var_name}}</td><td>{{plc_var.var_value}}</td>
            <td>{{ plc_var.comment }}</td><td><v-btn icon @click="remove(index)"><v-icon icon="mdi-delete"></v-icon></v-btn></td></tr>
          </tbody>
        </v-table>
          <div class="text-center">
            <v-btn
              block
              color="primary"
              @click="dialog = true"
              class="mb-2"
            >
              添加变量
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
                    v-model="new_var_name"
                    class="mb-2"
                    clearable
                    label="变量名"
                  ></v-text-field>

                  <v-text-field
                    v-model="new_comment"
                    clearable
                    label="备注"
                    placeholder="备注可以为空"
                  ></v-text-field>

                  <v-btn
                    block
                    color="success"
                    size="large"
                    type="submit"
                    variant="elevated"
                  >
                    添加变量
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
  {var_name: 'I0.0', var_value:false, comment:'开关'},
  {var_name: 'Q0.0', var_value: true, comment: '灯'}
]);
const dialog=ref(false);
const new_var_name=ref('');
const new_comment=ref('');
const add = () =>{
  plc_variables.value.push({var_name: new_var_name.value,var_value: false,comment: new_comment.value});
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
