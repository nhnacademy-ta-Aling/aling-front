const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const svgContext = require.context("@/assets/icons", false, /\.svg$/);
const svgs = requireAll(svgContext);
export default svgs;
