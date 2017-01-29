(function(){
	var token = "123456";
	var app = angular.module('tarefas',[]);
	app.controller('TarefasController', function($scope, $http){
		$scope.loadData = function () {
			$http.get('api/tarefas?api_token='+token).success(function(data,status) {
				$scope.dadostarefas = data;
			});
		}
		$scope.loadData();

		$scope.adicionarTarefa = function(){
			dadosPost = {'texto':$scope.texto,'autor': $scope.autor,'status':$scope.status};
			var requisicao = $http({method:"post", url:"api/tarefas?api_token="+token,data:dadosPost}).success(function(data,status){
				if(data && status == 201){
					$scope.loadData(function(){
            $scope.texto ='';
            $scope.autor ='';
            $scope.status ='';
          });
				}
				else{
					window.alert("Não foi possível adicionar a tarefa.");
				}
			});
		}

    $scope.mudarStatus = function(id,status){
      dadosPost = {'status':status};
      var requisicao = $http({method:"put", url:"api/tarefas/"+id+"?api_token="+token,data:dadosPost}).success(function(data,status){
				if(data.id == id && status == 201){
					$scope.loadData();
				}
				else{
					window.alert("Não foi possível alterar a tarefa.");
				}
			});
    }

    $scope.excluirTarefa = function(id){
      if(confirm("Confirma a exclusão da tarefa?")){
        var requisicao = $http({method:"delete", url:"api/tarefas/"+id+"?api_token="+token}).success(function(data,status){
  				if(data == 1 && status == 200){
  					$scope.loadData();
  				}
  				else{
  					window.alert("Não foi possível excluir a tarefa.");
  				}
  			});
      }
    }

	});
})();
