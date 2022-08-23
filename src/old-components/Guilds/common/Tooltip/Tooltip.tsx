import { useState } from 'react';
import { StyledSpan, TooltipContent } from './Tooltip.styled';
import { TooltipProps } from './types';

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleShowTooltip = () => setIsTooltipVisible(true);
  const handleHideTooltip = () => setIsTooltipVisible(false);
  const handleToggleTooltip = () => setIsTooltipVisible(!isTooltipVisible);

  return (
    <>
      <StyledSpan
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        onClick={handleToggleTooltip}
      >
        {children}
        {isTooltipVisible && (
          <TooltipContent position={position}>{content}</TooltipContent>
        )}
      </StyledSpan>
    </>
  );
};

export default Tooltip;
