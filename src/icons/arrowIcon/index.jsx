const ArrowIcon = ({ width = 32, height = 32, fill = "#001EB9" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 24.5714L17.5714 16L9 7.42857L10.7143 4L22.7143 16L10.7143 28L9 24.5714Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowIcon;
