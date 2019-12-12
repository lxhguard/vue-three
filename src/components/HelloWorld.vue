<template>
  <div>
    <div id="container"></div>
    <button @click="rotateOne">1</button>
    <button @click="rotateTwo">2</button>
    <button @click="rotateThree">3</button>
  </div>
  
</template>
<script>
  import * as THREE from "three";
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
  //import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
  //import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
  export default { 
    name: "HelloWorld",
    data() {
      return {
        scene: '',//环境
        light: '',//灯光
        camera: '',//相机
        controls: '',//控制器
        renderer: '',//渲染
        mesh:'',
        line:'',
        rotateNum:0,
      }
    },
    methods: {
      tiaoDNA(){
        window.console.log(11)
        this.$router.push('/dna');
      },
      rotateOne(){
        if(this.mesh){
          this.mesh.rotateY(2.0943952);
        }
      },
      rotateTwo(){
        if(this.mesh){
          this.mesh.rotateY(2.0943952);
        }
      },
      rotateThree(){
        if(this.mesh){
          this.mesh.rotateY(2.0943952);
        }
      },
		init() {
			//创建场景
			this.scene = new THREE.Scene();
			// 创建相机
			this.camera =  new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
			this.camera.position.set(0,0,80);
			// 环境光
			this.scene.add(new THREE.AmbientLight(4210752, 3));
// 		this.scene.fog = new THREE.Fog(0xffffff, 0.015, 1000);//雾
			this.scene.background = new THREE.CubeTextureLoader()
      .setPath('static/cube/room-1/').load( ['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg']);

// 		console.log(this.scene.background)

			// 平行光
			// var light = new THREE.DirectionalLight(0xffffff, 1);
			// light.position.set(30, 30, 30);
			// this.scene.add(light);
			
			// var helper = new THREE.CameraHelper(light.shadow.camera);
			// this.scene.add(helper); 

			this.scene.add(new THREE.AmbientLight(0x0c0c0c));
      let spotLight1 = new THREE.SpotLight(0xffffff);
      spotLight1.position.set(-400, -400, -400);

      let spotLight2 = new THREE.SpotLight(0xffffff);
      spotLight2.position.set(400, 400, 400);

      this.scene.add(spotLight1);
      this.scene.add(spotLight2);
			
			
			// 坐标系
			/* var axes = new THREE.AxesHelper(30);
			this.scene.add(axes); */
			
			//加载模型数据
      this.loadObj()

      this.drawCircle();

			//渲染
      this.renderer = new THREE.WebGLRenderer({
				antialias: true,    // 平滑效果
        alpha: true,    // canvas背景透明
			});
			this.renderer.setClearColor(0xFFFFFF);//背景
			
			this.renderer.setPixelRatio(window.devicePixelRatio);//为了兼容高清屏幕
			this.renderer.setSize(window.innerWidth, window.innerHeight);    
			//初始化控制器
			this.controls = new OrbitControls(this.camera,this.renderer.domElement);
			this.controls.target.set(0, 0,0);
			this.controls.update();
			
			this.animate();

      const container = document.getElementById('container');
      container.appendChild(this.renderer.domElement);   
      window.addEventListener('resize', this.onWindowResize, false);//添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    //画圆圈
    drawCircle(){
      var material = new THREE.LineBasicMaterial({color:'red', opacity:1});
      var ellipse = new THREE.EllipseCurve(0, 0, 13, 13, 0, 2.0 * Math.PI, true, 0);
      var ellipsePath = new THREE.CurvePath();
      ellipsePath.add(ellipse);
      var ellipseGeometry = ellipsePath.createPointsGeometry(100);
      ellipseGeometry.computeTangents();
      var line = new THREE.Line(ellipseGeometry, material);
      this.line = line;
      this.line.rotateX(1.7);
      this.scene.add( this.line );
    },
        //窗口监听函数
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        animate() {
          requestAnimationFrame(this.animate);
          this.render();
        },
        render() {
			this.controls.update();
			this.renderer.render(this.scene, this.camera);
        },
        //外部模型加载函数
		loadObj() {
			var that = this
			
			var manager = new THREE.LoadingManager();
			manager.onProgress = function(item, loaded, total){
        window.console.log(item, loaded, total);
			};
			
			var onProgress = function(xhr){
        if(xhr.lengthComputable){
          var percentComplete = xhr.loaded / xhr.total * 100;
          window.console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
			};
			
			var onError = function(xhr){
        window.console.error(xhr);
			};
      
      
			var tga_loader = new THREE.TextureLoader(manager);
			tga_loader.setPath('static/models/mooncake/');
			var material = new THREE.MeshPhongMaterial({  //MeshStandardMaterial
        map: tga_loader.load('mooncake.png'),
			}); 
			var obj_loader = new OBJLoader(manager);
			obj_loader.setPath('static/models/mooncake/');
			obj_loader.load('mooncake.obj', function(object){
          var geometry = object.children[0].geometry;
          geometry.attributes.uv2 = geometry.attributes.uv;
          geometry.center();
          material.side = THREE.DoubleSide;
          var mesh = new THREE.Mesh(geometry, material);
          window.console.log(mesh)
          mesh.scale.multiplyScalar(0.2);
          that.mesh = mesh;
          that.scene.add(mesh);
          }, onProgress, onError); 
        }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
#container{
  width: 1200px;
  margin: 0 auto;
  height: 800px;
  overflow: hidden;
}
</style>
