import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';

import { icon as EuiIconCheck } from '@elastic/eui/es/components/icon/assets/check'
import { icon as EuiIconArrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left'
import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down'
import { icon as EuiIconWarning } from '@elastic/eui/es/components/icon/assets/alert'
import { icon as EuiIconBug } from '@elastic/eui/es/components/icon/assets/bug'
import { icon as EuiIconCross } from '@elastic/eui/es/components/icon/assets/cross'


// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
    check: EuiIconCheck,
    arrowLeft: EuiIconArrowLeft,
    arrowDown: EuiIconArrowDown,
    bug: EuiIconBug,
    warning: EuiIconWarning,
    cross: EuiIconCross,
});


export default {
    check: EuiIconCheck,
    arrowLeft: EuiIconArrowLeft,
    bug: EuiIconBug,
    warning: EuiIconWarning
}
