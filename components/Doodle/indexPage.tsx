import { Doodle } from "@/components/Doodle";

export const FancyDoodle = Doodle`
:doodle {
  flex: none;
  @grid: 18x18;
  @size: 20rem 20rem;
  overflow: hidden;
  background-color: rgba(128,128,128,0.5);
  @shape: square;
  border-radius: 25%;
}
:container {
  animation: container 8s linear infinite both;
}
overflow: hidden;
opacity: .85;
@row(even) {
  animation: rowEven 8s ease both infinite @r(0, .15s);

  ::before { animation: before 8s ease both infinite @r(0, .15s); }
  ::after { animation: after 8s ease both infinite @r(0, .15s); }

  @odd {
    ::before { background-image: linear-gradient(#222052 50%, #ef4053 50%); }
    ::after { background-image: linear-gradient(#8D4024 50%, rgba(128,128,128,0.5) 50%); }
  }
  @even {
    ::before { background-image: linear-gradient(90deg, #331610 50%, #D48835 50%); }
    ::after { background-image: linear-gradient(90deg, #F36E55 50%, rgba(128,128,128,0.5) 50%); }
  }
}
@row(odd) {
  animation: rowOdd 8s ease both infinite @r(2s, 2.15s);

  ::before { animation: before 8s ease both infinite @r(2s, 2.15s); }
  ::after { animation: after 8s ease both infinite @r(2s, 2.15s); }

  @odd {
    ::before { background-image: linear-gradient(#0bc2bf 50%, #ef4053 50%); }
    ::after { background-image: linear-gradient(#69ffff 50%, #0D2429 50%); } 
  }
  @even {
    ::before { background-image: linear-gradient(90deg, #d4bc56 50%, rgba(128,128,128,0.5) 50%); }
    ::after { background-image: linear-gradient(90deg, #a59039 50%, #81554d 50%); }
  }
}
::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  @size: 100%;
}
::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  @size: 80%;
  margin-top: -40%;
  margin-left: -40%;
  border-radius: 100%;
}
@keyframes rowEven {
  0% { transform: translate(50%, 0);}
  6% { transform: translate(155%, 0);}
  10% { transform: translate(150%, 0);}
  50% { transform: translate(150%, 0);}
  55% { transform: translate(45%, 0);}
  60% { transform: translate(50%, 0);}
  100% { transform: translate(50%, 0); }
}
@keyframes rowOdd {
  0% { transform: translate(0%, 0);}
  6% { transform: translate(105%, 0);}
  10% { transform: translate(100%, 0);}
  50% { transform: translate(100%, 0);}
  55% { transform: translate(-5%, 0);}
  60% { transform: translate(0%, 0);}
  100% { transform: translate(0%, 0); }
}
@keyframes before {
  0% { transform: rotate(0deg) }
  6% { transform: rotate(95deg) }
  10% { transform: rotate(90deg) }
  50% { transform: rotate(90deg) }
  55% { transform: rotate(-5deg) }
  60% { transform: rotate(0deg) }
}
@keyframes after {
  0% { transform: rotate(0deg) }
  6% { transform: rotate(-95deg) }
  10% { transform: rotate(-90deg) }
  50% { transform: rotate(-90deg) }
  55% { transform: rotate(5deg) }
  60% { transform: rotate(0deg) }
}
@keyframes container {
  0% { transform: scale(3) rotate(-45deg) translate3d(50px, -50px, 0); }
  100% { transform: scale(3) rotate(-45deg) translate3d(-50px, 50px, 0); }
}
`;
