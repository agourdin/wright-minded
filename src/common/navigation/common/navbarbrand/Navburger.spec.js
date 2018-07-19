import React from 'react';
import Navburger from './Navburger';

// export default class Navburger extends React.Component {
//   render() {
//     const isNavburgerActive = this.props.isNavburgerActive;
//     return (
//       <div
//         className={
//           isNavburgerActive ? 'navbar-burger is-active' : 'navbar-burger'
//         }
//         onClick={this.props.navburgerClick}
//         style={{
//           position: 'relative',
//           top: '0.05em'
//         }}
//       >
//         <span aria-hidden="true" />
//         <span aria-hidden="true" />
//         <span aria-hidden="true" />
//       </div>
//     );
//   }
// }

describe('Navburger.spec.js // Navburger Component', () => {
  it('should have "is-active" in className when isNavburgerActive = true', () => {
    const wrapper = shallow(<Navburger isNavburgerActive={true} />);
    expect(wrapper.find('div').hasClass('is-active')).to.equal(true);
  });
  it('should not have "is-active" in className when isNavburgerActive = false', () => {
    const wrapper = shallow(<Navburger isNavburgerActive={false} />);
    expect(wrapper.find('div').hasClass('is-active')).to.equal(false);
  });
  it('should have a div with 3 span elements as children', () => {
    const wrapper = mount(<Navburger />);
    expect(wrapper.find('div').find('span')).to.have.lengthOf(3);
  });
});
