import { useCallback, useEffect, useRef, useState } from "react";
import s from "./SvgSkillsTree.module.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SvgSkillsTreeProps = {};

const SvgSkillsTree = ({}: SvgSkillsTreeProps) => {
  const [matrix, setMatrix] = useState("");
  const rootBoxRef = useRef<HTMLDivElement>(null);
  const viewBoxRef = useRef<SVGRectElement>(null);

  const [scale, setScale] = useState(0.1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Минимальный и максимальный масштаб
  const MIN_SCALE = 0.02;
  const MAX_SCALE = 0.5;

  const scaleX: number | null = null;
  const scaleY: number | null = null;
  const coordX: number | null = null;
  const coordY: number | null = null;
  const zoom = 0;

  // Функция для применения матрицы трансформации
  const applyTransform = useCallback(() => {
    if (viewBoxRef.current) {
      // matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
      const matrix = `matrix(${scale}, 0, 0, ${scale}, ${position.x}, ${position.y})`;
      viewBoxRef.current.style.transform = matrix;
    }
  }, [scale, position]);

  // Обработчик колесика мыши
  const handleWheel = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? -0.02 : 0.02;
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));

      // Вычисляем смещение для сохранения позиции под курсором
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Преобразуем координаты мыши в систему координат элемента
      const elementX = (mouseX - position.x) / scale;
      const elementY = (mouseY - position.y) / scale;

      // Новые координаты для сохранения позиции под курсором
      const newX = mouseX - elementX * newScale;
      const newY = mouseY - elementY * newScale;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
    },
    [scale, position]
  );

  // Обработчики для перетаскивания
  const handleMouseDown = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (e.button !== 0) return; // Только левая кнопка мыши

      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });

      e.preventDefault();
    },
    [position]
  );

  const handleMouseMove = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Сброс масштаба и позиции
  const resetTransform = useCallback(() => {
    setScale(0.1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Применяем трансформацию при изменении scale или position
  useEffect(() => {
    applyTransform();
  }, [applyTransform]);

  // Добавляем/убираем глобальные обработчики для перетаскивания
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // const handleMouseWheel = (event) => {
  //   event.preventDefault();
  //   const { deltaY } = event;
  //   const { a, d } = viewBoxRef?.current?.transform.baseVal[0].matrix;

  //   if (deltaY < 0) {
  //     if (zoom < 1) {
  //       zoom = Math.min(zoom + 0.1, 1);
  //       setMatrix(`matrix(${a + zoom} 0 0 ${d + zoom} 0 0)`);
  //     }
  //   }

  //   if (deltaY > 0) {
  //     if (zoom > 0) {
  //       zoom = Math.max(zoom - 0.1, 0);
  //       setMatrix(`matrix(${a - zoom} 0 0 ${d - zoom} 0 0)`);
  //     }
  //   }

  //   console.log(a, d);
  // };

  // const handleMouseOver = (event: any) => {
  //   document.addEventListener("wheel", handleMouseWheel, { passive: false });
  // };

  // const handleMouseLeave = () => {
  //   document.removeEventListener("wheel", handleMouseWheel);
  // };

  // const handleDragElement = (event) => {
  //   const { clientX, clientY } = event;
  //   console.log(clientX, clientY);
  // };

  // const handleDragStart = () => {
  //   console.log("mousedown");
  //   document.addEventListener("mousemove", handleDragElement);
  //   // viewBoxRef?.current?.addEventListener("mousemove", handleDragElement);
  // };

  // useEffect(() => {
  //   if (viewBoxRef && viewBoxRef.current) {
  //     viewBoxRef.current.addEventListener("mousedown", handleDragStart);
  //     viewBoxRef.current.addEventListener("mouseup", handleDragElement);
  //   }

  //   return () => {
  //     document.removeEventListener("mousemove", handleDragElement);
  //     viewBoxRef?.current?.removeEventListener("mousedown", handleDragStart);
  //     viewBoxRef?.current?.removeEventListener("mouseup", handleDragElement);
  //     viewBoxRef?.current?.removeEventListener("mousemove", handleDragElement);
  //   };
  // }, [viewBoxRef]);

  useEffect(() => {
    if (viewBoxRef && viewBoxRef.current && rootBoxRef && rootBoxRef.current) {
      const viewBoxWidth = viewBoxRef.current.getBoundingClientRect().width;
      const viewBoxHeight = viewBoxRef.current.getBoundingClientRect().height;
      const rootBoxWidth = rootBoxRef.current.getBoundingClientRect().width;
      const rootBoxHeight = rootBoxRef.current.getBoundingClientRect().height;
      // viewBoxRef.current.style.transform = `matrix(${
      //   rootBoxWidth / viewBoxWidth
      // } 0 0 ${rootBoxHeight / viewBoxHeight} 0 0)`;

      setMatrix(
        `matrix(${rootBoxWidth / viewBoxWidth} 0 0 ${
          rootBoxHeight / viewBoxHeight
        } 0 0)`
      );

      // console.log("viewBoxWidth", viewBoxWidth);
      // console.log("viewBoxHeight", viewBoxHeight);
      // console.log("rootBoxWidth", rootBoxWidth);
      // console.log("rootBoxHeight", rootBoxHeight);
      // console.log(viewBoxRef.current);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const preventScroll = (e: any) => {
      if (rootBoxRef.current && rootBoxRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    // Добавляем обработчик с passive: false для возможности preventDefault
    document.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventScroll);
    };
  }, []);

  return (
    <div
      ref={rootBoxRef}
      className={s.root}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      {/* <div className={s.viewBox}></div> */}
      <svg xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="0"
          width="10000"
          height="10000"
          fill="blue"
          transform={matrix}
          ref={viewBoxRef}
        />
      </svg>
    </div>
  );
};
export { SvgSkillsTree };
