        export class RangeSlider {
            static instanceCount = 0;

            constructor(container, {
                min = 0,
                max = 100,
                step = 1,
                initialMin = 20,
                initialMax = 80,
                arrowColor = '#4285f4',
                arrowSize = 16,
            } = {}) {
                this.container = container;
                this.min = min;
                this.max = max;
                this.step = step;
                this.arrowColor = arrowColor;
                this.arrowSize = arrowSize;
                this.has = this.arrowSize / 2;
                this.instanceId = `dual-slider-${RangeSlider.instanceCount++}`;

                // Slider container
                this.sliderContainer = document.createElement('div');
                this.sliderContainer.className = `slider-container ${this.instanceId}`;
                this.sliderContainer.style.cssText = `
                position: relative;
                width: 100%px;
                height: 100%px;
                `;
                this.container.appendChild(this.sliderContainer);

                // Optional range highlight
                //this.rangeTrack = document.createElement('div');
                //this.rangeTrack.style.display = 'none';
                //this.sliderContainer.appendChild(this.rangeTrack);

                //this.rangeHighlight = document.createElement('div');
                //this.rangeHighlight.style.display = 'none';
                //this.sliderContainer.appendChild(this.rangeHighlight);

                // Create min and max sliders
                this.minRange = document.createElement('input');
                this.maxRange = document.createElement('input');
                [this.minRange, this.maxRange].forEach((range, index) => {
                range.type = 'range';
                range.min = min;
                range.max = max;
                range.step = step;
                range.value = index === 0 ? initialMin : initialMax;
                range.style.cssText = `
                    position: absolute;
                    pointer-events: none;
                    -webkit-appearance: none;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    top: 0;
                    margin: 0;
                    padding: 0;
                `;
                });

                this.minRange.className = 'min-range';
                this.maxRange.className = 'max-range';

                this.sliderContainer.appendChild(this.minRange);
                this.sliderContainer.appendChild(this.maxRange);

                // Inject instance-specific thumb styles
                
                const style = document.createElement('style');
                style.textContent = `
                .${this.instanceId} .min-range::-webkit-slider-thumb {
                    pointer-events: auto;
                    -webkit-appearance: none;
                    height: ${arrowSize}px;
                    width: ${arrowSize}px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    top: 3px;
                    border-style: solid;
                    border-width: ${this.has}px 0 ${this.has}px ${arrowSize}px;
                    border-color: transparent transparent transparent ${arrowColor};
                    bborder-radius: 2px;
                    transform: translateX(-${arrowSize}px);
                }

                .${this.instanceId} .max-range::-webkit-slider-thumb {
                    pointer-events: auto;
                    -webkit-appearance: none;
                    height: ${arrowSize}px;
                    width: ${arrowSize}px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    top: 3px;
                    border-style: solid;
                    border-width: ${this.has}px ${arrowSize}px ${this.has}px 0;
                    border-color: transparent ${arrowColor} transparent transparent;
                    bborder-radius: 2px;
                    transform: translateX(0px);
                }

                .${this.instanceId} .min-range::-moz-range-thumb {
                    pointer-events: auto;
                    height: ${arrowSize}px;
                    width: ${arrowSize}px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    top: 3px;
                    border-style: solid;
                    border-width: ${this.has}px 0 ${this.has}px ${arrowSize}px;
                    border-color: transparent transparent transparent ${arrowColor};
                    bborder-radius: 2px;
                    transform: translateX(-${arrowSize}px);
                }

                .${this.instanceId} .max-range::-moz-range-thumb {
                    pointer-events: auto;
                    height: ${arrowSize}px;
                    width: ${arrowSize}px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    top: 3px;
                    border-style: solid;
                    border-width: ${this.has}px ${arrowSize}px ${this.has}px 0;
                    border-color: transparent ${arrowColor} transparent transparent;
                    bborder-radius: 2px;
                    transform: translateX(0px);
                }
                `;
                document.head.appendChild(style);

                // Display values
                /*
                this.valuesContainer = document.createElement('div');
                this.valuesContainer.style.marginTop = '50px';
                this.valuesContainer.style.fontSize = '16px';
                this.container.appendChild(this.valuesContainer);

                this.minValLabel = document.createElement('label');
                this.minValLabel.innerHTML = `Min: <span class="min-val">${this.minRange.value}</span>`;
                this.valuesContainer.appendChild(this.minValLabel);
                this.valuesContainer.appendChild(document.createElement('br'));

                this.maxValLabel = document.createElement('label');
                this.maxValLabel.innerHTML = `Max: <span class="max-val">${this.maxRange.value}</span>`;
                this.valuesContainer.appendChild(this.maxValLabel);

                this.minValSpan = this.minValLabel.querySelector('.min-val');
                this.maxValSpan = this.maxValLabel.querySelector('.max-val');
            */

                this.updateSlider = this.updateSlider.bind(this);
                this.minRange.addEventListener('input', this.updateSlider);
                this.maxRange.addEventListener('input', this.updateSlider);

                this.updateSlider();
            }

            updateSlider() {
                let minVal = parseInt(this.minRange.value);
                let maxVal = parseInt(this.maxRange.value);
                if (minVal > maxVal) [minVal, maxVal] = [maxVal, minVal];

                this.minRange.value = minVal;
                this.maxRange.value = maxVal;

                const rangeWidth = this.minRange.offsetWidth;
                const minPercent = (minVal - this.min) / (this.max - this.min) * rangeWidth;
                const maxPercent = (maxVal - this.min) / (this.max - this.min) * rangeWidth;

                //this.rangeHighlight.style.left = minPercent + 'px';
                //this.rangeHighlight.style.width = (maxPercent - minPercent) + 'px';

                //this.minValSpan.textContent = minVal;
                //this.maxValSpan.textContent = maxVal;
            }
        }