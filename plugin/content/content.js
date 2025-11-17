// Content Script - Executa a análise na página
(function() {
  // Executar análise usando o módulo AcessiCheck 
  const results = AcessiCheck.analyze();
  
  // Retornar resultados para o popup
  return results;
})();
