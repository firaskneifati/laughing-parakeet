import { observable } from 'mobx';
import { v4 as uuid} from 'uuid';

export const PHASE = {
    INCOMPLETE: 1,
    INPROGRESS: 2,
    COMPLETE: 3,
}
export default function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Sample item",
            phase: PHASE.INCOMPLETE,
            tags: ['Sampletag'],
        }],
        progressItems: [],
        completedItems: [],
        tags: ['Sampletag'],
        filter: '',
        get activeItems() {
            return self.items.filter(i => i.phase === PHASE.INCOMPLETE && ('' === self.filter || i.tags.includes(self.filter)));
        },
        get progressItems() {
            return self.items.filter(i => i.phase === PHASE.INPROGRESS && ('' === self.filter || i.tags.includes(self.filter)));
        },
        get completedItems() {
            return self.items.filter(i => i.phase === PHASE.COMPLETE && ('' === self.filter || i.tags.includes(self.filter)));
        },
        setFilter(tag) {
            self.filter = tag;
        },
        addItem() {
            self.items.push({
                id: uuid(),
                name: `Item ${self.activeItems.length}`,
                phase: PHASE.INCOMPLETE,
                tags: [],
            });
        },
        addTag(tag, id) {
            if (tag.length > 0) {
                if (!self.tags.includes(tag)) {
                    self.tags.push(tag);
                }
                const item = self.items.find(i => i.id === id);
                if (!item.tags.includes(tag)) {
                    item.tags.push(tag);
                }
            }
        },
        deleteTag(tagToDelete, id) {
            const item = self.items.find(i => i.id === id);
            item.tags = item.tags.filter(tag => tag !== tagToDelete);
        },
        setItemName(id, name) {
            const item = self.items.find(i => i.id === id);
            item.name = name;
        },
        moveForward(id) {
            const item = self.items.find(i => i.id === id);
            if( PHASE.COMPLETE === item.phase ) {
                return;
            }
            item.phase++;
        },
        moveBackward(id) {
            const item = self.items.find(i => i.id === id);
            if( PHASE.INCOMPLETE === item.phase ) {
                self.items = self.items.filter(item => item.id !== id);
                return;
            }
            item.phase--;
        },
        deleteItem(id) {
            self.items = self.items.filter(item => item.id !== id);
        }
    })

    return self;
}
