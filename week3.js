Vue.createApp({
    data() {
        return {
            listNewItem: '',
            todoList: [],
            editingItemIndex: '',
            listItemNumber:'0',
            itemCategorySelected:'',
            itemCategory:[
                { text: '完整', value: '' },
                { text: '完成', value: true },
                { text: '未完成', value: false }
            ]
        }
    },
    methods: {
        localStorageDisplay(){
            if(localStorage.getItem('todoList') != undefined){
                this.todoList = JSON.parse(localStorage.getItem('todoList'))
                this.listItemNumber = JSON.parse(localStorage.getItem('todoList')).length++
            }
        },
        addNewItem(){
            const listItemWaitedForSave={
                value: this.listNewItem,
                completed: false
            };
            this.todoList.push(listItemWaitedForSave)
            this.todoListSaveToLocalStorage(this.todoList)
            this.listNewItem = '';
            this.listItemNumber = JSON.parse(localStorage.getItem('todoList')).length++
        },
        removeItem(key){
            this.todoList.splice(key,1)
            this.todoListSaveToLocalStorage(this.todoList)
            this.listItemNumber = JSON.parse(localStorage.getItem('todoList')).length++
        },
        itemEditCompleted(){
            this.editingItemIndex='';
            this.todoListSaveToLocalStorage(this.todoList)
        },
        itemCompletedSwitch(key){
            if(this.todoList[key].completed === true) this.todoList[key].completed = false;
            else this.todoList[key].completed = true;
            this.todoListSaveToLocalStorage(this.todoList)
        },
        todoListSaveToLocalStorage(todolistWaitedToSave){
            localStorage.setItem('todoList', JSON.stringify(todolistWaitedToSave));
        },
        todoListClear(){
            this.todoList = [];
            localStorage.clear();
            this.listItemNumber = '0';
        }
    },
    computed:{
        itemCategorySelect(){
            if(this.itemCategorySelected === ''){
                return this.todoList
            }else{
                return this.todoList.filter(item => item.completed === this.itemCategorySelected)
            }
        }
    },
    mounted(){
        this.localStorageDisplay();
    }
}).mount('#app');