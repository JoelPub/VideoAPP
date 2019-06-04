let testComponents = {
    template: `
       <div>这是接收了父组件传递值的子组件的childArray: {{childArray}} <br>
           <button type="button" @click="changeArray">
           点击我改变父元素的parentArray</button>
         </div>`,
    props: ["childArray"],
    data() {
        return {
            counter: 1
        };
    },
    methods: {
        changeArray() {
            console.log(this);
            this.childArray.push(this.counter++);
            this.$emit(
                "myclick",
                "这是我暴露出去的数据",
                "这是我暴露出去的数据2"
            );
        }
    }
}


export {
    testComponents
}
