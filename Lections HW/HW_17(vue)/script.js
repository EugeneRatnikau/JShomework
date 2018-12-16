const URL = 'https://todolist-c419b.firebaseio.com/todos.json';

Vue.component('todoitem', {
	template: `	<div>
					<input type="text" placeholder="Item..."
						v-if="isThisExactItem()"
						v-model="value">
					<span v-else class="item-text">{{ itemid+1 }}. {{ text }}</span>
					<button class="icons" title="Rename item"
						@click="editItem">Rename item</button>
					<button class="icons" title="Remove item"
						@click="appstate.isEditingItem ? cancel() : removeItem()">Remove item</button>
				</div>`,
	data: function(){
		return {
			value: '',
			currId: null
		}
	},
	props: ['text', 'itemid', 'appstate', 'listid'],
	methods: {
		editItem(){
			if(! this.appstate.isEditingItem){
				if(this.isSomethingElseIsChanging())
					return;
				this.currId = this.itemid;
				this.value = this.text;
				console.log(this.itemid);
				return this.$emit('edit-item', this.currId);
			}
			return this.$emit('edit-item', this.currId, this.value);
		}
		,removeItem(){
			return this.$emit('remove-item', this.itemid);
		}
		,isSomethingElseIsChanging(){
			return Object.values(this.appstate).some(el => el);
		}
		,isThisExactItem(){
			return this.appstate.isEditingItem && this.itemid == this.appstate.itemId && this.listid == this.appstate.listId
		}
		,cancel(){
			return this.$emit('cancel');
		}
	}
})

Vue.component('todolist', {
	template: `<div class="todo">
					<div class="title">
						<input v-if="isThisExactTitle()"
								v-model="value">
						<h3 v-else class="list-title">Title: {{ title }}</h3>
						<button class="icons" title="Rename list"
								@click="editTitle"
								:src="(isThisExactTitle()) ? 'button/apply.png' : 'button/edit.png'">Rename list</button>
						<button class="icons" title="Remove list"
								@click="(isThisExactTitle()) ? cancel() : removeList()"
								>Remove list</button></div>
					<todoitem class="item" v-for="(item, index) in items"
							:text="item" :itemid="index" :appstate="appstate" :listid="listid"
							@edit-item="(itemId, value) => $emit('edit-item', itemId, listid, value)"
							@remove-item="(itemId) => $emit('remove-item', itemId, listid)"
							@cancel="cancel"
							></todoitem>
					<input type="text" placeholder="Item..."
							v-show="appstate.isAddingItem && listid == appstate.listId"
							v-model="value">
					<input type="button" class="add-item-btn" title="Add new item..." value="+"
							v-if="!isThisExactList()"
							@click="addNewItem">
					<div v-else>
						<button class="icons" title="Rename list"
								@click="addNewItem">Rename item</button>
						<button class="icons" title="Remove list"
								@click="cancel">Remove item</button></div>
				</div>`,
	data: function(){
		return {
			value: '',
			currId: null
		}
	},
	props: ['title', 'listid', 'items', 'appstate'],
	methods: {
		editTitle(){
			if(! this.appstate.isRenamingList){
				if(this.isSomethingElseIsChanging())
					return;
				this.value = this.title;
				this.currId = this.listid;
				return this.$emit('rename-title', this.currId);
			}
			return this.$emit('rename-title', this.currId, this.value);
		}
		,removeList(){
			return this.$emit('remove-list', this.listid);
		}
		,cancel(){
			return this.$emit('cancel');
		}
		,isSomethingElseIsChanging(){
			return Object.values(this.appstate).some(el => el);
		}
		,addNewItem(){
			if(! this.appstate.isAddingItem){
				if(this.isSomethingElseIsChanging())
					return;
				this.value = '';
				this.currId = this.listid;
				console.log(this.listid);
				return this.$emit('add-item', this.currId);
			}
			return this.$emit('add-item', this.currId, this.value);
		}
		,isThisExactTitle(){
			return this.appstate.isRenamingList && this.listid == this.appstate.listId;
		}
		,isThisExactList(){
			return this.appstate.isAddingItem && this.listid == this.appstate.listId;
		}
	}
});

var app = new Vue({
	el: "#app",
	data: {
		stateManager: {
			isAddingList: false,
			isRenamingList: false,
			isAddingItem: false,
			isEditingItem: false,
			listId: null,
			itemId: null,
			value: null
		},
		lists: [],
		text: ''
	},
	created(){
		this.fetchTodos()
	},
	methods: {
		addList() {
			if(! this.stateManager.isAddingList){
				this.stateManager.isAddingList = true;
				this.text = '';
				return;
			} else {
				if(!this.text)
					return;
				axios.post(URL, {title: this.text, items: []})
					.then(()=>this.fetchTodos());
				this.resetStateManager();
			}
		}
		,renameList(id, value){
			if(! this.stateManager.isRenamingList){
				this.stateManager.isRenamingList = true;
				this.stateManager.listId = id;
				return;
			} else {
				if(!value)
					return;
				this.lists[id].title = value;
				axios.put(URL, this.lists)
					 .then(() => this.fetchTodos());
				this.resetStateManager();
			}
		}
		,removeList(id){
			if(confirm('r u sure?')){
				delete this.lists[id];
				axios.put(URL, this.lists)
					 .then(() => this.fetchTodos());
			}
		}
		,addItem(id, value){
			if(! this.stateManager.isAddingItem){
				this.stateManager.isAddingItem = true;
				this.stateManager.listId = id;
			} else {
				if(!value)
					return;
				if(!this.lists[id].items)
					this.lists[id].items = [];
				this.lists[id].items.push(value)
				axios.put(URL, this.lists)
					 .then(() => this.fetchTodos());
				this.resetStateManager();
			}
		}
		,editItem(item, list, value){
			if(! this.stateManager.isEditingItem){
				this.stateManager.isEditingItem = true;
				this.stateManager.listId = list;
				this.stateManager.itemId = item;
				return;
			} else {
				if(!value)
					return;
				this.lists[list].items[item] = value;
				axios.put(URL, this.lists)
					 .then(() => this.fetchTodos());
				this.resetStateManager();
			}
		}
		,removeItem(item, list){
			if(confirm('r u sure?')){
				this.lists[list].items.splice(item, 1);
				axios.put(URL, this.lists)
					 .then(() => this.fetchTodos());
			}
		}
		,resetStateManager(){
			this.stateManager.isAddingList = false;
			this.stateManager.isRenamingList = false;
			this.stateManager.isAddingItem = false;
			this.stateManager.isEditingItem = false;
			this.stateManager.listId = null;
			this.stateManager.itemId = null;
			this.stateManager.value = '';
			this.text = '';
		}
		,fetchTodos(){
			axios.get(URL)
				.then(res => {
					if(!res.data)
						return;
					this.lists = res.data;
					console.log(this.lists)
			});
		}
	}
});