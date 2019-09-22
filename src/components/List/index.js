import React, { useContext, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { useDrop } from "react-dnd";

import BoardContext from "../Board/context";
import Card from "../Card";

import { Container } from "./styles";

export default function List({ data, index: listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);
  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      const draggedIndex = item.index;
      const targetIndex = data.cards.length !== 0 ? data.cards.length - 1 : 0;

      console.log(targetIndex);

      if (draggedListIndex === targetListIndex) return;
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });
  dropRef(ref);
  return (
    <Container ref={ref} done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} listIndex={listIndex} index={index} data={card} />
        ))}
      </ul>
    </Container>
  );
}
