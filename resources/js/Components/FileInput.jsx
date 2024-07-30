import React, { forwardRef } from 'react';

const FileInput = forwardRef((props, ref) => (
    <input ref={ref} type="file" className="hidden" {...props} />
));

export default FileInput;
