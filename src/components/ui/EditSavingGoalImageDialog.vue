<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-vue-next'
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

const open = ref(false)
let imgUrl =
  'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'

let image = imgUrl

const fileInputRef = ref(null)

let file = ref<File>()

const selectedFile = (event: InputEvent) => {
  file.value = (event.currentTarget as HTMLInputElement)?.files?.[0]

  //works, can upload a file. Now to display it???
}
</script>

<template>
  <Dialog :open="open" @update:open="(state) => (open = state)">
    <DialogTrigger as-child>
      <Button>
        <Pencil class="w-4 h-4" />
        Endre bilde
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader> Last opp bilde </DialogHeader>
      <!-- <img alt="Bilde for sparemål" :src="imgUrl"> -->
      <img alt="bilde nr 2" v-bind:src="image" />
      <!--
      <Input type="file" id="file" accept="image/*" ref="file" @change="pickFile"/> -->
      <Input type="file" name="import_file" v-on:change="selectedFile($event)" />
      <DialogFooter> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
