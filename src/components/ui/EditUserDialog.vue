<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { ref } from 'vue'

const open = ref(false)

const userInfo = {
  username: '@kjelljen',
  name: 'Kjell Jentoft'
}

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(3).max(50),
    name: z.string().min(5).max(100)
  })
)

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  name: 'Ola glåmen',
  username: 'ksdjsdfjfdsnjfdsj'
})

const handleSubmit = form.handleSubmit((values) => {
  open.value = false
})
</script>
<template>
  <Dialog :open="open" @update:open="(state) => (open = state)">
    <DialogTrigger as-child>
      <Button class="w-full"> Rediger profil </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Rediger profil </DialogTitle>
        <DialogDescription>
          Her kan du endre profilen din. Husk å lagre endringene når du er ferdig.
        </DialogDescription>
      </DialogHeader>
      <form @submit="handleSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel> Navn </FormLabel>
              <FormControl>
                <Input class="col-span-3" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel> Brukernavn </FormLabel>
              <FormControl>
                <Input class="col-span-3" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button type="submit" data-testid="modal-save">Lagre endringer</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
