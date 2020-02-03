const house = {
	state: {
		address:'',//获取当前房子的位置
		isShowmap:false, //是否显示
		lat:0,
		lng:0,
		isShowMap:false,
		center:[]
	},
	getters: {
     address: state => state.address
    },

	mutations: {
		SET_ADDRESS:(state, address) => {
			state.address = address
		},

		
		SET_center:(state, center) => {
			state.center = center
		},
		isShowMap:(state, isShowMap)=>{
      state.isShowMap = isShowMap
		}

		
	},

	actions:{
		
	}
}

export default house