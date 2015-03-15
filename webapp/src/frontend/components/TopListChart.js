import React     from 'react';
import BaseChart from './BaseChart';

class TopListChart extends React.Component {

    render() {
        let unit   = this.props.unit;
        let counts = this.props.counts;

        if (this.props.sort) {
            counts = counts.slice(0).sort((a,b) => a[this.props.unit] - b[this.props.unit]);
        }

        let data = {
            labels: counts.map(e => e.meta && e.meta.party ? `${e.key} (${e.meta.party})` : e.key),
            series: counts.length ? [counts.map(e => e[unit])] : []
        };

        let isHorizontal = this.props.orientation === 'horizontal';

        let chartOptions = {
            chartPadding: {left: 5},
            horizontalBars: isHorizontal,
            reverseData: !isHorizontal,
            axisX: {
                showGrid: isHorizontal,
                labelInterpolationFnc: this.formatValue.bind(this),
                offset: 60
            },
            axisY: {
                labelOffset: { x: 0, y: 5 },
                showGrid: !isHorizontal,
                labelInterpolationFnc: this.formatValue.bind(this),
                offset: 50
            }
        };

        return (
            <div className="top-list-chart">
                <h3 className="text-center">{this.props.subtitle}</h3>


                <BaseChart
                    type="Bar"
                    data={data}
                    aspectRatio="minor-sixth"
                    options={chartOptions}
                />

            </div>
        );
    }

    formatValue(value) {
        if (typeof value === 'number') {
            return this.props.unit === 'pct' ? `${value.toFixed(2)}%` : value;
        } else {
            return value;
        }
    }

}

TopListChart.propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    counts: React.PropTypes.array.isRequired,
    unit: React.PropTypes.string.isRequired
};

module.exports = TopListChart;
