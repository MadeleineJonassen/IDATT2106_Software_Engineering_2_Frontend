import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Updater } from '@tanstack/vue-table'
import { computed, type Ref } from 'vue'
import type { TrophyProps } from '@/components/ui/TrophyItem.vue'
import type { BadgeProgressDto } from '@/lib/api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

/**
 * Checks localstorage to see if the user has signed in before
 */
export const isNewUser = (userId: string) => {
  return !localStorage.getItem(userId)
}

/**
 * Updates localstorge, allowing the user to avoid viewing the onboarding page
 * next time they sign in.
 * @param userId
 */
export const setIsNotNewUser = (userId: string) => {
  localStorage.setItem(userId, String(true))
}

/**
 * Updates localstorge, allowing the user to view the onboarding page icon
 * @param badge Badge number, retrieved from backend
 */
export const badgeMap: { [key: string]: string } = {
  '8': 'default-head.svg',
  '2': 'super-spare-gris.svg',
  '3': 'ninja-gris.svg',
  '4': 'grisebank-er.svg',
  '5': 'greedy-pig.svg',
  '6': 'rock-pig.svg',
  '7': 'sigma-pig.svg',
  '0': 'sus-pig-us.svg'
}

export const filterDoneBadges = (trophies: Ref<BadgeProgressDto[] | undefined>) => {
  return computed<TrophyProps[]>(() => {
    return format(
      trophies.value?.filter(
        (badge) =>
          !badge.badgeDto?.badgeTiers?.length ||
          (badge.progress ?? 0) >= (badge.badgeDto.badgeTiers[0]?.target ?? 0)
      )
    ) as TrophyProps[]
  })
}

export const filterInProgressBadges = (trophies: Ref<BadgeProgressDto[] | undefined>) => {
  return computed<TrophyProps[]>(() => {
    return format(
      trophies.value?.filter(
        (badge) =>
          (badge.badgeDto?.badgeTiers?.length || (badge.progress ?? 0) > 0) &&
          (badge.badgeDto?.badgeTiers?.[0].target ?? 0) > (badge.progress ?? 0)
      )
    ) as TrophyProps[]
  })
}
const format = (trophies: BadgeProgressDto[] | undefined) => {
  return (
    trophies?.map((badge) => {
      return {
        title: badge.badgeDto?.name,
        description: badge.badgeDto?.description,
        tiers: badge.badgeDto?.badgeTiers,
        target: badge.badgeDto?.badgeTiers?.[badge.badgeDto?.badgeTiers.length - 1]?.target ?? 0,
        progress: badge.progress,
        type: badge.badgeDto?.id,
        displayTierLabels: (badge.badgeDto?.badgeTiers?.length ?? 0) > 0
      }
    }) ?? []
  )
}
