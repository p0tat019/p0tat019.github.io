document.addEventListener("DOMContentLoaded", () => {
  const pcView = document.querySelector(".PC_view");
  const codeTextarea = document.querySelector(".code");

  const stages = {
      IF: document.querySelector(".IF_Instruction"),
      ID: document.querySelector(".ID_Instruction"),
      EX: document.querySelector(".EX_Instruction"),
      MEM: document.querySelector(".MEM_Instruction"),
      WB: document.querySelector(".WB_Instruction")
  };

  let pc = 0x00400024; // 초기 Program Counter 값
  let instructions = [];

  // 명령어를 읽어오는 함수
  const loadInstructions = () => {
      const code = codeTextarea.value;
      instructions = code.split("\n").map(line => line.trim()).filter(line => line);
      pc = 0x00400024; // Program Counter 초기화
      updatePCView();
  };

  // PC 값을 업데이트하는 함수
  const updatePCView = () => {
      pcView.textContent = `PC : ${pc.toString(16).toUpperCase().padStart(8, '0')}`;
  };

  // 각 단계 실행 함수
  const executeStage = (stage) => {
      const instruction = instructions.shift();
      if (!instruction) {
          stages[stage].textContent = "None";
          return;
      }
      stages[stage].textContent = instruction;
      pc += 4; // 명령어 실행 후 PC 증가
      updatePCView();
  };

  // 버튼 클릭 이벤트 리스너 등록
  document.querySelector(".IF").addEventListener("click", () => executeStage("IF"));
  document.querySelector(".ID").addEventListener("click", () => executeStage("ID"));
  document.querySelector(".EX").addEventListener("click", () => executeStage("EX"));
  document.querySelector(".MEM").addEventListener("click", () => executeStage("MEM"));
  document.querySelector(".WB").addEventListener("click", () => executeStage("WB"));

  // 코드 입력 후 초기화
  codeTextarea.addEventListener("change", loadInstructions);

  // 초기화
  loadInstructions();
});
