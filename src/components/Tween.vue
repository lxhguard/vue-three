<template>
    <div>
        <div id="tween"></div>
    </div>
</template>

<script>
// import tween from "tween";
import * as THREE from "three";
import {TweenMax} from "gsap";


export default {
    name: 'Tween',
    data(){
        return{
            scene: '',//环境
            light: '',//灯光
            camera: '',//相机
            renderer: '',//渲染,
            sprite:'',//渲染点
            group:[],//渲染点集合,
            particle:'',//初始点
        }
    },
    mounted(){
        this.init();
        this.tweenUpdate();
    },
    methods:{
        init(){
            //创建场景
			this.scene = new THREE.Scene();
			// 创建相机
			this.camera =  new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
			this.camera.position.set(0,0,80);
			// 环境光
            this.scene.add(new THREE.AmbientLight(4210752, 3));
            this.scene.add(new THREE.AmbientLight(0x0c0c0c));
            //渲染
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,    // 平滑效果
            });

            //创建粒子效果
            // var geometry = new THREE.SphereGeometry( 25, 25, 25 );
            // var material = new THREE.PointsMaterial( { color:'red' } ) ;
            // var mesh = new THREE.Points( geometry, material );
            // this.sprite = mesh;
            // this.scene.add(this.sprite)

            var spriteMaterial = new THREE.SpriteMaterial( { color:'red' } );
            var sprite = new THREE.Sprite( spriteMaterial );
            sprite.position.x = 0;
            sprite.position.y = 0;
            sprite.position.z = 0;
            this.sprite = sprite;
            this.scene.add(this.sprite);

            this.group = new THREE.Group();
            this.scene.add( this.group );

            for ( var i = 0; i < 15; i++ ) {
                //为每个点附上材质
                var material = new THREE.SpriteMaterial( {
                    color: Math.random() * 0x808008 + 0x808080,
                } );

                this.particle = new THREE.Sprite( material );
                this.particle.position.x = 0;
                this.particle.position.y = -500;
                this.particle.position.z = 0;
                this.particle.scale.x = this.particle.scale.y = Math.random() * 4 + 2;
                this.group.add(this.particle);
            }

            var geometry = new THREE.SphereGeometry( 5, 5, 5 );
            for (i = 0; i < 15; i++ ) {

                material = new THREE.SpriteMaterial( {
                    color: Math.random() * 0x808008 + 0x808080,
                } );

                this.particle = new THREE.Sprite( material );

                var timerandom = 1*Math.random();
                //为每个点加动画
                TweenMax.to(
                    this.particle.position,
                    timerandom,
                    {x:geometry.vertices[i].x+(0.5-Math.random()),y:geometry.vertices[i].y+(0.5-Math.random()),z:0.5,delay:0.5,} 
                ).repeat(100);
                this.group.add( this.particle );
            }
            
           
			this.renderer.setClearColor(0x000);//背景
            this.renderer.setSize(window.innerWidth, window.innerHeight); 
            
            this.animate();

            const tween = document.getElementById('tween');
            tween.appendChild(this.renderer.domElement);
            
            //监听鼠标位置
            window.addEventListener("mousemove", this.tweenFollow, false);   
        },
        tweenFollow(e){
            e.preventDefault();

            var mouse = this.convertTo3DCoordinate(e.clientX,e.clientY);
            this.sprite.position.copy(mouse)
            // TweenMax.to(this.sprite.position, 0, {
            //     x: mouse.x,
            //     y:mouse.y,
            // })
            var timerandom = 1*Math.random();
            for (var i = 0; i < 15; i++ ) {
                TweenMax.to(
                    this.group[i].position,
                    timerandom,
                    {x:this.sprite.position.x+(0.5-Math.random()),y:this.sprite.position.y+(0.5-Math.random()),z:0.5,delay:0.5,} 
                ).repeat(100);
                this.group.add( this.particle );
            }
            
            //this.particle.position.copy(mouse)
        },
        convertTo3DCoordinate(clientX,clientY){
            var mv = new THREE.Vector3(
                (clientX / window.innerWidth) * 2 - 1,
                -(clientY / window.innerHeight) * 2 + 1.23,
                0.99 );
            mv.unproject(this.camera);   //这句将一个向量转成threejs坐标
            return mv;
        },
        animate() {
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        },
        tweenUpdate(){
            requestAnimationFrame(this.tweenUpdate);
            // this.$tweener.update();
        },
    },
  
}
</script>
<style scoped>

</style>