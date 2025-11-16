# Design

<div class="chart-container" style="position: relative; height:250px; width:250px; margin: 20px auto;">
    <canvas class="checklist-pie-chart"></canvas>
</div>

## Aparência
- Não dependa apenas de cor; ofereça outra pista (rótulo, padrão, ícone). WCAG 1.4.1 [^wcag141], 1.4.3 [^wcag143]; NBR 5.11.1 [^abnt17225];
  <br>
  <input type="checkbox" name="item1" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item1" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item1" value="naoAplicavel"> Não aplicável

- Textos ampliam ~200% sem quebrar layout nem ocultar conteúdo. WCAG 1.4.4 [^wcag144], 1.4.10 [^wcag1410];
<br>
  <input type="checkbox" name="item2" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item2" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item2" value="naoAplicavel"> Não aplicável

- Disponibilize tema acessível (alto contraste / modo escuro). WCAG 1.4.3 [^wcag143], 1.4.11 [^wcag1411]; NBR 5.11.3; 5.11.2 [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item3" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item3" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item3" value="naoAplicavel"> Não aplicável

- Evite MAIÚSCULAS prolongadas, fontes muito condensadas e texto justificado. NBR 5.11 [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item4" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item4" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item4" value="naoAplicavel"> Não aplicável

- Nomes de controles descrevem a ação (não apenas “ícone de…”). WCAG 2.4.6 [^wcag246], 4.1.2 [^wcag412]; NBR 5.13.7; 5.13.10 [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item5" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item5" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item5" value="naoAplicavel"> Não aplicável

- Parágrafos com ~80 caracteres por linha e fontes fluidas. NBR 5.12.6 [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item6" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item6" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item6" value="naoAplicavel"> Não aplicável

- Controles nomeados pelo propósito, não pela posição/visual. WCAG 4.1.2 [^wcag412]; NBR 3.42; 5.13.7; 5.13.10; 5.8.3 [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item7" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item7" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item7" value="naoAplicavel"> Não aplicável

- Ajuste de linhas ao viewport; cuidado com `display:none`/`visibility:hidden`. WCAG 1.3.1 [^wcag131], 2.4.3 [^wcag243], 4.1.2 [^wcag412]; NBR [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item8" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item8" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item8" value="naoAplicavel"> Não aplicável

## Animação
- Nada pisca acima de 3 vezes/seg. WCAG 2.3.1 [^wcag231], 2.3.2 [^wcag232];
<br>
  <input type="checkbox" name="item9" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item9" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item9" value="naoAplicavel"> Não aplicável

- Todo movimento pode pausar/parar/ocultar. WCAG 2.2.2 [^wcag222];
<br>
  <input type="checkbox" name="item10" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item10" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item10" value="naoAplicavel"> Não aplicável

- Respeite “reduzir movimento”. WCAG 2.3.3 [^wcag233]; NBR [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item11" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item11" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item11" value="naoAplicavel"> Não aplicável

## Contraste de cores
- Texto com contraste adequado (normal e grande). WCAG 1.4.3 [^wcag143]; NBR 5.11.3; 5.11.2 [^abnt17225];
<br>
  <input type="checkbox" name="item12" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item12" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item12" value="naoAplicavel"> Não aplicável

- Ícones/bordas/indicadores com contraste mínimo. WCAG 1.4.11 [^wcag1411]; NBR 5.11.4; 5.11.5 [^abnt17225];
<br>
  <input type="checkbox" name="item13" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item13" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item13" value="naoAplicavel"> Não aplicável

- Texto sobre imagem continua legível. WCAG 1.4.3 [^wcag143], 1.4.11 [^wcag1411]; NBR [^abnt17225]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item14" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item14" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item14" value="naoAplicavel"> Não aplicável

- Estados ativos/selecionados permanecem legíveis. WCAG 1.4.11 [^wcag1411]; NBR 5.11.6 [^abnt17225];
<br>
  <input type="checkbox" name="item15" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item15" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item15" value="naoAplicavel"> Não aplicável

- Inclua seleção e bordas de inputs na checagem de contraste. WCAG 1.4.11 [^wcag1411]; Guia UK/BR [^guiaukbr];
<br>
  <input type="checkbox" name="item16" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item16" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item16" value="naoAplicavel"> Não aplicável

## Interação e foco
- Foco visível e perceptível. WCAG 2.4.7 [^wcag247]; NBR 5.11.6; 5.10.5 [^abnt17225];
<br>
  <input type="checkbox" name="item17" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item17" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item17" value="naoAplicavel"> Não aplicável

- Foco não fica encoberto. WCAG 2.4.11 [^wcag2411], 2.4.12 [^wcag2412]; NBR 5.10 [^abnt17225];
<br>
  <input type="checkbox" name="item18" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item18" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item18" value="naoAplicavel"> Não aplicável

- Alvos de toque com tamanho/afastamento confortáveis; alternativa ao arrastar. WCAG 2.5.8 [^wcag258], 2.5.7 [^wcag257];
<br>
  <input type="checkbox" name="item19" value="conforme"> Conforme
  <br>
  <input type="checkbox" name="item19" value="naoConforme"> Não conforme
  <br>
  <input type="checkbox" name="item19" value="naoAplicavel"> Não aplicável

## Referências

[^abnt17225]: **ABNT NBR 17225:2025.** Acessibilidade em comunicação na Web. Disponível em: [https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf). Acesso em: 15 nov 2025.

[^guiaukbr]: DINIZ, V.; FERRAZ, R.; NASCIMENTO, C. M.; CREDIDIO, R. **Guia de Boas Práticas para Acessibilidade Digital**. Programa de Cooperação entre Reino Unido e Brasil em Acesso Digital, 2023. Disponível em: <https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf>. Acesso em: 15 nov 2025.

[^wcag141]: WCAG 2.2 Understanding Docs. SC 1.4.1 Use of Color (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html). Acesso em: 15 nov 2025.

[^wcag143]: WCAG 2.2 Understanding Docs. SC 1.4.3 Contrast (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Acesso em: 15 nov 2025.

[^wcag144]: WCAG 2.2 Understanding Docs. SC 1.4.4 Resize Text (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html). Acesso em: 15 nov 2025.

[^wcag1410]: WCAG 2.2 Understanding Docs. SC 1.4.10 Reflow (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/reflow.html](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Acesso em: 15 nov 2025.

[^wcag1411]: WCAG 2.2 Understanding Docs. SC 1.4.11 Non-text Contrast (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Acesso em: 15 nov 2025.

[^wcag246]: WCAG 2.2 Understanding Docs. SC 2.4.6 Headings and Labels (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html). Acesso em: 15 nov 2025.

[^wcag412]: WCAG 2.2 Understanding Docs. SC 4.1.2 Name, Role, Value (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). Acesso em: 15 nov 2025.

[^wcag131]: WCAG 2.2 Understanding Docs. SC 1.3.1 Info and Relationships (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html). Acesso em: 15 nov 2025.

[^wcag243]: WCAG 2.2 Understanding Docs. SC 2.4.3 Focus Order (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html). Acesso em: 15 nov 2025.

[^wcag231]: WCAG 2.2 Understanding Docs. SC 2.3.1 Three Flashes or Below Threshold (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html). Acesso em: 15 nov 2025.

[^wcag232]: WCAG 2.2 Understanding Docs. SC 2.3.2 Three Flashes (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html). Acesso em: 15 nov 2025.

[^wcag222]: WCAG 2.2 Understanding Docs. SC 2.2.2 Pause, Stop, Hide (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Acesso em: 15 nov 2025.

[^wcag233]: WCAG 2.2 Understanding Docs. SC 2.3.3 Animation from Interactions (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Acesso em: 15 nov 2025.

[^wcag247]: WCAG 2.2 Understanding Docs. SC 2.4.7 Focus Visible (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html). Acesso em: 15 nov 2025.

[^wcag2411]: WCAG 2.2 Understanding Docs. SC 2.4.11 Focus Not Obscured (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html). Acesso em: 15 nov 2025.

[^wcag2412]: WCAG 2.2 Understanding Docs. SC 2.4.12 Focus Not Obscured (Enhanced) (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html). Acesso em: 15 nov 2025.

[^wcag258]: WCAG 2.2 Understanding Docs. SC 2.5.8 Target Size (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Acesso em: 15 nov 2025.

[^wcag257]: WCAG 2.2 Understanding Docs. SC 2.5.7 Dragging Movements (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html). Acesso em: 15 nov 2025.