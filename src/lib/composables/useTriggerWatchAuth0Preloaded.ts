import { onBeforeMount, onBeforeUpdate, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

/* Auth0 doesn't automatically update between view changes.
This means watch(auth0.isLoading) isn't triggered in most cases.
To make the watch-hook trigger when auth0 is preloaded:
  * Added a ref(boolean), triggerWatch
  * toggle it if auth0 is preloaded before page is mounted, or updated
*/

export function useTriggerWatchAuth0Preloaded() {
  const triggerWatch = ref(false)
  const auth0 = useAuth0()

  const updateTriggerWatch = () => {
    if (!auth0.isLoading.value) {
      triggerWatch.value = !triggerWatch.value
    }
  }
  onBeforeMount(() => updateTriggerWatch())
  onBeforeUpdate(() => updateTriggerWatch())

  return { triggerWatch }
}
