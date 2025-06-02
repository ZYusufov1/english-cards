import type {WordItem} from '@/store/words.ts'

const addUnique = (target: WordItem[], source: WordItem[]): void => {
    source.forEach(item => {
        const exists = target.some(existing => existing.word === item.word)
        if (!exists) {
            target.push(item)
        }
    })
}

export default addUnique
