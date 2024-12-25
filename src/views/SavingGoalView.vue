<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus } from 'lucide-vue-next'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { ref } from 'vue'

const userInfo = {
  imageUrl: 'https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg',
  fullName: 'Kenneth Roger',
  username: '@kennethrog'
}

const open = ref(false)

const userInfo2 = {
  savingName: 'Mat',
  description: 'Rema1000',
  savingSum: '300',
  endDate: '24242024',
  account: '123456789'
}

const formSchema = toTypedSchema(
  z.object({
    savingName: z.string().min(2).max(50),
    description: z.string().min(0).max(25),
    savingSum: z.string().min(2).max(10),
    endDate: z.string().min(4).max(16),
    account: z.string().min(8).max(16)
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  savingName: 'Mat',
  description: 'test',
  savingSum: '300',
  endDate: '01012025',
  account: '987654321'
})

const handleSubmit = form.handleSubmit((values) => {
  open.value = false
})
</script>

<template>
  <PageWrapper :title="userInfo2.savingName">
    <Card class="w-fit mx-auto">
      <CardContent class="flex items-center gap-3">
        <div class="aspect-square overflow-hidden rounded-full flex items-center w-full">
          <img alt="Sparemålsbilde" :src="userInfo.imageUrl" class="object-cover h-full" />
        </div>
        <Tabs default-value="edit savinggoal" class="w-full">
          <TabsList class="w-full">
            <TabsTrigger class="w-full" value="edit savinggoal">Rediger sparemål</TabsTrigger>
            <TabsTrigger class="w-full" value="challenges">Spareutfordringer</TabsTrigger>
          </TabsList>

          <TabsContent value="edit savinggoal">
            <CardHeader>
              <CardTitle>Rediger sparemål</CardTitle>
              <CardDescription>Endre verdiene til sparemålet</CardDescription>
            </CardHeader>

            <form @submit="handleSubmit">
              <CardContent>
                <div class="flex gap-2.5 flex-col">
                  <FormField v-slot="{ componentField }" name="savingName">
                    <FormItem>
                      <FormLabel>Navn</FormLabel>
                      <FormControl>
                        <Input v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                      <FormLabel>Beskrivelse</FormLabel>
                      <FormControl>
                        <Input v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="savingSum">
                    <FormItem>
                      <FormLabel>Målsum</FormLabel>
                      <FormControl>
                        <Input v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="endDate">
                    <FormItem>
                      <FormLabel>Sluttdato</FormLabel>
                      <FormControl>
                        <Input v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="account">
                    <FormItem>
                      <FormLabel>Konto</FormLabel>
                      <FormControl>
                        <Input v-bind="componentField" />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" data-testid="modal-save" class="w-full gap-1">
                  <Plus class="w-4 h-4" />
                  Lagre endringer
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="challenges">
            <CardHeader>
              <CardTitle>Spareutfordringer</CardTitle>
              <CardDescription> Spareutfordringer tilknyttet ditt sparemål </CardDescription>
            </CardHeader>
            <CardContent>content</CardContent>
            <CardFooter>
              <Button class="w-full gap-1">
                <Plus class="w-4 h-4" />
                Ny spareutfordring
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </PageWrapper>
</template>
