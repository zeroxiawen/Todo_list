export class LoadingAnimation {
  constructor(className, count, animation, duration) {
    this.className = className;
    this.count = count;
    this.duration = duration;
    this.animation = animation;
  }

  createLoadingAnimation() {
    const loading = document.querySelector('.loading');
    if (!loading) {
      return;
    }

    loading.innerHTML = '';
    for (let i = 1; i <= this.count; i++) {
      const bar = document.createElement('div');
      bar.className = `${this.className}`;
      bar.style.transform = `translateX(-50%) rotate(${
        i * (360 / this.count)
      }deg) translateY(-15px)`;
      bar.style.opacity = `${i / this.count}`;
      bar.style.animation = `${this.animation} ${this.duration}s linear infinite`;
      bar.style.animationDelay = `${(this.duration / this.count) * (i - 1)}s`;
      loading.appendChild(bar);
    }
  }
}
const loadingSpinner = new LoadingAnimation('bar', 14, 'spin', 1);
loadingSpinner.createLoadingAnimation();
// @for $i from 1 through $max {
//     .bar-index-#{$i} {
//       transform: translateX(-50%) rotate(#{$i * $degree}deg) translateY(-15px);
//       opacity: #{$i / $max};
//       animation: spin $duration linear infinite;
//       animation-delay: #{($duration / $max) * ($i - 1)};
//     }
//   }
